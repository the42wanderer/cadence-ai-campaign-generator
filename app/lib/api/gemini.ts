import { GoogleGenerativeAI } from '@google/generative-ai';
import { RATE_LIMITS, ERROR_MESSAGES } from '../constants';
import type { ApiError, RateLimitInfo } from '../types';

class GeminiAPI {
  private client: GoogleGenerativeAI;
  private model: any;
  private requestQueue: Promise<any>[] = [];
  private requestCount = 0;
  private resetTime = Date.now() + 60000;
  private dailyRequestCount = 0;
  private dailyResetTime = Date.now() + 86400000; // 24 hours

  constructor() {
    if (!process.env.GEMINI_API_KEY) {
      throw new Error(ERROR_MESSAGES.MISSING_API_KEY);
    }
    this.client = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    this.model = this.client.getGenerativeModel({ model: 'gemini-2.0-flash-exp' });
  }

  private async rateLimit(): Promise<void> {
    const now = Date.now();
    
    // Reset minute counter
    if (now > this.resetTime) {
      this.requestCount = 0;
      this.resetTime = now + 60000;
    }

    // Reset daily counter
    if (now > this.dailyResetTime) {
      this.dailyRequestCount = 0;
      this.dailyResetTime = now + 86400000;
    }

    // Check minute rate limit
    if (this.requestCount >= RATE_LIMITS.GEMINI.REQUESTS_PER_MINUTE) {
      const waitTime = this.resetTime - now;
      console.log(`Rate limit reached. Waiting ${waitTime}ms...`);
      await new Promise(resolve => setTimeout(resolve, waitTime));
      this.requestCount = 0;
      this.resetTime = Date.now() + 60000;
    }

    // Check daily rate limit
    if (this.dailyRequestCount >= RATE_LIMITS.GEMINI.REQUESTS_PER_DAY) {
      const waitTime = this.dailyResetTime - now;
      throw new Error(`Daily rate limit exceeded. Try again in ${Math.ceil(waitTime / 3600000)} hours.`);
    }

    this.requestCount++;
    this.dailyRequestCount++;
  }

  async generateContent(prompt: string, retries = 1): Promise<string> {
    await this.rateLimit();

    for (let i = 0; i < retries; i++) {
      try {
        const result = await this.model.generateContent(prompt);
        const response = await result.response;
        return response.text();
      } catch (error: any) {
        console.error(`Gemini API attempt ${i + 1} failed:`, error);
        
        // Handle rate limits with retry instead of immediate failure
        if (error.message?.includes('quota') || error.message?.includes('rate') || error.message?.includes('Rate limit')) {
          if (i === retries - 1) {
            throw new Error(ERROR_MESSAGES.RATE_LIMIT_EXCEEDED);
          }
          console.log(`Rate limit hit, retrying in ${2000}ms...`);
          // Single retry with short wait
          await new Promise(resolve => setTimeout(resolve, 2000));
          continue;
        }
        
        if (i === retries - 1) {
          throw new Error(error.message || ERROR_MESSAGES.GENERATION_FAILED);
        }
        
        // Single retry for other errors
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }
    throw new Error(ERROR_MESSAGES.GENERATION_FAILED);
  }

  async generateJSON(prompt: string, retries = 2): Promise<any> {
    const jsonPrompt = `${prompt}\n\nIMPORTANT: Return ONLY valid JSON with no markdown formatting, no backticks, no explanations. The JSON should be properly formatted and parseable.`;
    
    for (let i = 0; i < retries; i++) {
      try {
        const response = await this.generateContent(jsonPrompt);
        
        // Clean response of any potential formatting
        const cleaned = response
          .replace(/```json\n?/g, '')
          .replace(/```\n?/g, '')
          .replace(/^[^{]*/, '') // Remove any text before the first {
          .replace(/[^}]*$/, '') // Remove any text after the last }
          .trim();
        
        return JSON.parse(cleaned);
      } catch (error: any) {
        console.error(`JSON generation attempt ${i + 1} failed:`, error);
        
        // If it's a rate limit, let the generateContent method handle retries
        if (error.message?.includes('Rate limit') || error.message?.includes('quota')) {
          if (i === retries - 1) {
            throw error; // Re-throw rate limit errors
          }
          continue;
        }
        
        // For JSON parsing errors, try again with a fresh request
        if (i === retries - 1) {
          console.error('JSON parse error after all retries:', error);
          throw new Error('Failed to parse Gemini response as JSON');
        }
        
        // Wait before retrying JSON parsing
        await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1)));
      }
    }
    throw new Error('Failed to generate valid JSON after all retries');
  }

  async generateBatch(prompts: string[]): Promise<string[]> {
    const results: string[] = [];
    
    // Process in batches to respect rate limits
    const batchSize = 5;
    for (let i = 0; i < prompts.length; i += batchSize) {
      const batch = prompts.slice(i, i + batchSize);
      const batchPromises = batch.map(prompt => this.generateContent(prompt));
      
      try {
        const batchResults = await Promise.allSettled(batchPromises);
        batchResults.forEach((result, index) => {
          if (result.status === 'fulfilled') {
            results.push(result.value);
          } else {
            console.error(`Batch item ${i + index} failed:`, result.reason);
            results.push(''); // Add empty string for failed items
          }
        });
      } catch (error) {
        console.error(`Batch ${i / batchSize + 1} failed:`, error);
        // Add empty strings for the entire batch
        batch.forEach(() => results.push(''));
      }
    }
    
    return results;
  }

  getRateLimitInfo(): RateLimitInfo {
    const now = Date.now();
    const remainingRequests = Math.max(0, RATE_LIMITS.GEMINI.REQUESTS_PER_MINUTE - this.requestCount);
    const resetTime = this.resetTime;
    
    return {
      requests: this.requestCount,
      limit: RATE_LIMITS.GEMINI.REQUESTS_PER_MINUTE,
      resetTime: resetTime
    };
  }

  getDailyUsage(): { used: number; limit: number; resetTime: number } {
    return {
      used: this.dailyRequestCount,
      limit: RATE_LIMITS.GEMINI.REQUESTS_PER_DAY,
      resetTime: this.dailyResetTime
    };
  }

  async generateImage(prompt: string, retries = 2): Promise<string> {
    // For now, use a more sophisticated placeholder service that generates images based on prompts
    // This is a temporary solution until we can get proper AI image generation working
    
    console.log('Image generation requested for prompt:', prompt);
    
    // Use a better placeholder service that generates images based on prompts
    try {
      const searchTerm = prompt.toLowerCase()
        .replace(/[^a-z0-9\s]/g, '') // Remove special characters
        .replace(/\s+/g, ' ') // Normalize spaces
        .trim()
        .split(' ')
        .slice(0, 2) // Take first 2 words
        .join(',');
      
      // Use Lorem Picsum with a more specific seed based on the prompt
      const seed = prompt.split('').reduce((a, b) => {
        a = ((a << 5) - a) + b.charCodeAt(0);
        return a & a;
      }, 0);
      
      const picsumUrl = `https://picsum.photos/400/400?random=${Math.abs(seed)}`;
      
      console.log('Using Picsum placeholder for:', searchTerm, 'with seed:', Math.abs(seed));
      return picsumUrl;
      
    } catch (error) {
      console.error('Error generating placeholder image:', error);
      return `https://picsum.photos/400/400?random=${Date.now()}`;
    }
  }

  async generateVideo(prompt: string): Promise<string> {
    await this.rateLimit();

    try {
      // Note: Veo 3 is not available yet, so we'll use a placeholder
      console.warn('Video generation not available yet, using placeholder');
      return `https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4`;
      
    } catch (error: any) {
      console.error('Video generation failed:', error);
      return `https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4`;
    }
  }
}

// Singleton instance
export const geminiAPI = new GeminiAPI();
