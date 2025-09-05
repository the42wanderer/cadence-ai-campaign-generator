import { NextRequest, NextResponse } from 'next/server';
import { contentService } from '../../../lib/services/content';
import type { GenerationRequest, GenerationResponse } from '../../../lib/types';

export async function POST(request: NextRequest) {
  try {
    const body: GenerationRequest = await request.json();
    const { prompt, platforms, contentType, enhancePrompt } = body;

    // Validate input
    const validation = contentService.validateRequest({
      ...body,
      mode: 'single'
    });

    if (!validation.valid) {
      return NextResponse.json(
        { 
          success: false,
          error: 'Validation failed',
          details: validation.errors 
        } as GenerationResponse,
        { status: 400 }
      );
    }

    // Enhance prompt if requested
    let finalPrompt = prompt;
    if (enhancePrompt) {
      try {
        finalPrompt = await contentService.enhancePrompt(
          prompt,
          platforms[0],
          contentType
        );
      } catch (error) {
        console.error('Prompt enhancement failed:', error);
        // Continue with original prompt if enhancement fails
      }
    }

    // Generate content
    const posts = await contentService.generateSinglePost(
      finalPrompt,
      platforms,
      contentType
    );

    return NextResponse.json({ 
      posts, 
      success: true,
      enhancedPrompt: enhancePrompt ? finalPrompt : undefined
    } as GenerationResponse);

  } catch (error: any) {
    console.error('Single post generation error:', error);
    
    return NextResponse.json(
      { 
        success: false,
        error: error.message || 'Content generation failed',
        details: error.stack
      } as GenerationResponse,
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    { 
      success: false,
      error: 'Method not allowed. Use POST to generate content.' 
    },
    { status: 405 }
  );
}
