'use client';

import { useState } from 'react';
import { 
  Camera, 
  Video, 
  FileText, 
  Instagram, 
  Youtube, 
  Twitter, 
  Linkedin, 
  Facebook, 
  Copy, 
  Download,
  Sparkles,
  Calendar,
  Clock,
  BarChart3
} from 'lucide-react';

// Platform data
const PLATFORMS = {
  instagram: { id: 'instagram', name: 'Instagram', icon: Instagram, limits: { captionLength: 2200, hashtagLimit: 30 } },
  tiktok: { id: 'tiktok', name: 'TikTok/Reels/Shorts', icon: Video, limits: { captionLength: 150, hashtagLimit: 20 } },
  linkedin: { id: 'linkedin', name: 'LinkedIn', icon: Linkedin, limits: { captionLength: 3000, hashtagLimit: 5 } },
  twitter: { id: 'twitter', name: 'Twitter/X', icon: Twitter, limits: { captionLength: 280, hashtagLimit: 2 } },
  facebook: { id: 'facebook', name: 'Facebook', icon: Facebook, limits: { captionLength: 63206, hashtagLimit: 30 } },
  youtube: { id: 'youtube', name: 'YouTube', icon: Youtube, limits: { captionLength: 5000, hashtagLimit: 15 } }
};

const CONTENT_TYPES = [
  { value: 'image', label: 'Image', description: 'Static images with captions', icon: Camera },
  { value: 'video', label: 'Video', description: 'Short-form video content', icon: Video },
  { value: 'text', label: 'Text Only', description: 'Text-based posts without media', icon: FileText }
];

const FREQUENCY_OPTIONS = [
  { value: 'daily', label: 'Daily', description: 'One post per day' },
  { value: 'every-2-days', label: 'Every 2 Days', description: 'One post every two days' },
  { value: 'weekly', label: 'Weekly', description: 'One post per week' },
  { value: 'bi-weekly', label: 'Bi-weekly', description: 'One post every two weeks' }
];

const DURATION_OPTIONS = [
  { value: '1-week', label: '1 Week', description: '7 days of content' },
  { value: '2-weeks', label: '2 Weeks', description: '14 days of content' },
  { value: '1-month', label: '1 Month', description: '30 days of content' },
  { value: '3-months', label: '3 Months', description: '90 days of content' },
  { value: '6-months', label: '6 Months', description: '180 days of content' }
];

const CONTENT_MIX_OPTIONS = [
  { value: 'balanced', label: 'Balanced', description: 'Equal mix of all content types' },
  { value: 'image-heavy', label: 'Image Heavy', description: '70% images, 20% videos, 10% text' },
  { value: 'video-heavy', label: 'Video Heavy', description: '60% videos, 30% images, 10% text' },
  { value: 'text-heavy', label: 'Text Heavy', description: '50% text, 30% images, 20% videos' }
];

export default function SocialMediaTool() {
  const [mode, setMode] = useState<'single' | 'campaign'>('single');
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [prompt, setPrompt] = useState('');
  const [enhancePrompt, setEnhancePrompt] = useState(true);
  const [contentType, setContentType] = useState<'image' | 'video' | 'text'>('image');
  const [campaignSettings, setCampaignSettings] = useState({
    frequency: 'daily',
    duration: '1-week',
    contentMix: 'balanced'
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState<any>(null);
  const [isSliding, setIsSliding] = useState(false);
  const [slideDirection, setSlideDirection] = useState<'left' | 'right'>('right');

  const handlePlatformToggle = (platformId: string) => {
    setSelectedPlatforms(prev => 
      prev.includes(platformId) 
        ? prev.filter(p => p !== platformId)
        : [...prev, platformId]
    );
  };

  const handleModeChange = (newMode: 'single' | 'campaign') => {
    if (newMode === mode) return;
    
    setIsSliding(true);
    setSlideDirection(newMode === 'single' ? 'left' : 'right');
    
    // Quick mode change for toggle
    setTimeout(() => {
      setMode(newMode);
    }, 100);
    
    // Content animation completes with balanced timing
    setTimeout(() => {
      setIsSliding(false);
    }, 400);
  };

  const handleGenerate = async () => {
    if (!prompt.trim() || selectedPlatforms.length === 0) return;

    setIsGenerating(true);
    setGeneratedContent(null);

    try {
      const endpoint = mode === 'single' ? '/api/generate/single' : '/api/generate/campaign';
      const body = mode === 'single' 
        ? { prompt, platforms: selectedPlatforms, contentType, enhancePrompt }
        : { 
            prompt, 
            platforms: selectedPlatforms, 
            contentType, 
            enhancePrompt,
            frequency: campaignSettings.frequency,
            duration: campaignSettings.duration,
            contentMix: campaignSettings.contentMix
          };

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });

      const data = await response.json();
      setGeneratedContent(data);
    } catch (error) {
      console.error('Generation failed:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className={`min-h-screen ${mode === 'single' ? 'single-mode' : 'campaign-mode'}`} style={{ backgroundColor: 'var(--background)' }}>
      {/* Header */}
      <header className="header-gradient border-b" style={{ borderColor: 'var(--border-subtle)' }}>
        <div className="max-w-4xl mx-auto px-6 py-16">
          <div className="header-content text-center">
            <h1 className="text-6xl font-bold mb-6" style={{ 
              color: 'var(--text-primary)',
              fontFamily: 'Geist, sans-serif',
              fontWeight: '800',
              letterSpacing: '-0.03em'
            }}>
              Cadence
            </h1>
            <p className="text-xl mb-2" style={{ 
              color: 'var(--text-secondary)',
              fontFamily: 'Geist Mono, monospace'
            }}>
              AI-Powered Social Media Content Generator
            </p>
            <p className="text-base" style={{ 
              color: 'var(--text-secondary)',
              fontFamily: 'Geist Mono, monospace'
            }}>
              Powered by Gemini AI
            </p>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Mode Selection */}
        <div className="mb-12">
          <div className="mode-switch-container">
            {/* Sliding Toggle Background */}
            <div className={`mode-toggle-slider ${mode}`}></div>
            
            <button
              onClick={() => handleModeChange('single')}
              className={`mode-button ${mode === 'single' ? 'active' : ''}`}
            >
              Single Post
            </button>
            <button
              onClick={() => handleModeChange('campaign')}
              className={`mode-button ${mode === 'campaign' ? 'active' : ''}`}
            >
              Full Campaign
            </button>
          </div>
        </div>

        {/* Main Content - Centered Single Column */}
        <div className={`content-section space-y-8 ${isSliding ? `slide-out-${slideDirection}` : `slide-in-${slideDirection}`}`}>
          {/* Prompt Input */}
          <div className="card">
            <h2 className="text-2xl font-bold mb-6 text-center" style={{ 
              color: 'var(--text-primary)',
              fontFamily: 'Geist, sans-serif',
              fontWeight: '700'
            }}>
              Your Vision
            </h2>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Describe your content idea... What story do you want to tell?"
              className="input-field resize-none h-32"
              style={{ fontFamily: 'Geist Mono, monospace' }}
            />
            <div className="flex items-center justify-center mt-6">
              <input
                type="checkbox"
                id="enhance"
                checked={enhancePrompt}
                onChange={(e) => setEnhancePrompt(e.target.checked)}
                className="mr-3 w-5 h-5"
                style={{ accentColor: 'var(--accent-primary)' }}
              />
              <label htmlFor="enhance" className="text-base font-medium" style={{ 
                color: 'var(--text-secondary)', 
                fontFamily: 'Geist Mono, monospace' 
              }}>
                Enhance prompt with AI insights
              </label>
            </div>
          </div>

          {/* Platform Selection */}
          <div className="card">
            <h2 className="text-2xl font-bold mb-6 text-center" style={{ 
              color: 'var(--text-primary)',
              fontFamily: 'Geist, sans-serif',
              fontWeight: '700'
            }}>
              Platforms
            </h2>
            <div className="grid grid-cols-2 gap-4">
              {Object.entries(PLATFORMS).map(([id, platform]) => {
                const IconComponent = platform.icon;
                return (
                  <button
                    key={id}
                    onClick={() => handlePlatformToggle(id)}
                    className={`p-6 rounded-2xl border-2 transition-all duration-200 text-left ${
                      selectedPlatforms.includes(id)
                        ? 'card-selected'
                        : 'hover:border-interactive'
                    }`}
                    style={{
                      borderColor: selectedPlatforms.includes(id) ? 'var(--accent-primary)' : 'var(--border-subtle)',
                      backgroundColor: selectedPlatforms.includes(id) ? 'var(--accent-primary)' : 'var(--background)'
                    }}
                  >
                    <div className="flex items-center space-x-3">
                      <IconComponent 
                        size={24} 
                        style={{ 
                          color: selectedPlatforms.includes(id) ? 'var(--accent-text)' : 'var(--text-primary)' 
                        }} 
                      />
                      <div>
                        <div className="font-semibold text-lg" style={{ 
                          color: selectedPlatforms.includes(id) ? 'var(--accent-text)' : 'var(--text-primary)', 
                          fontFamily: 'Geist Mono, monospace' 
                        }}>
                          {platform.name}
                        </div>
                        <div className="text-sm" style={{ 
                          color: selectedPlatforms.includes(id) ? 'var(--accent-text)' : 'var(--text-secondary)',
                          fontFamily: 'Geist Mono, monospace'
                        }}>
                          {platform.limits.captionLength} chars
                        </div>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Content Type */}
          <div className="card">
            <h2 className="text-2xl font-bold mb-6 text-center" style={{ 
              color: 'var(--text-primary)',
              fontFamily: 'Geist, sans-serif',
              fontWeight: '700'
            }}>
              Content Type
            </h2>
            <div className="space-y-3">
              {CONTENT_TYPES.map((type) => {
                const IconComponent = type.icon;
                return (
                  <button
                    key={type.value}
                    onClick={() => setContentType(type.value as any)}
                    className={`w-full p-6 rounded-2xl border-2 transition-all duration-200 text-left ${
                      contentType === type.value
                        ? 'card-selected'
                        : 'hover:border-interactive'
                    }`}
                    style={{
                      borderColor: contentType === type.value ? 'var(--accent-primary)' : 'var(--border-subtle)',
                      backgroundColor: contentType === type.value ? 'var(--accent-primary)' : 'var(--background)'
                    }}
                  >
                    <div className="flex items-center space-x-4">
                      <IconComponent 
                        size={24} 
                        style={{ 
                          color: contentType === type.value ? 'var(--accent-text)' : 'var(--text-primary)' 
                        }} 
                      />
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <div className="font-semibold text-lg" style={{ 
                            color: contentType === type.value ? 'var(--accent-text)' : 'var(--text-primary)', 
                            fontFamily: 'Geist Mono, monospace' 
                          }}>
                            {type.label}
                          </div>
                          {type.value === 'video' && (
                            <span 
                              className="px-2 py-1 rounded-full text-xs font-medium"
                              style={{
                                backgroundColor: '#FEF3C7',
                                color: '#92400E',
                                fontFamily: 'Geist Mono, monospace',
                                fontSize: '0.75rem',
                                fontWeight: '600'
                              }}
                            >
                              BETA
                            </span>
                          )}
                        </div>
                        <div className="text-sm" style={{ 
                          color: contentType === type.value ? 'var(--accent-text)' : 'var(--text-secondary)',
                          fontFamily: 'Geist Mono, monospace'
                        }}>
                          {type.description}
                        </div>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Campaign Settings */}
          {mode === 'campaign' && (
            <div className="card">
              <h2 className="text-2xl font-bold mb-6 text-center" style={{ 
                color: 'var(--text-primary)',
                fontFamily: 'Geist, sans-serif',
                fontWeight: '700'
              }}>
                Campaign Settings
              </h2>
              <div className="space-y-6">
                <div>
                  <label className="flex items-center text-lg font-semibold mb-3" style={{ 
                    color: 'var(--text-primary)', 
                    fontFamily: 'Geist Mono, monospace' 
                  }}>
                    <Clock size={20} className="mr-2" style={{ color: 'var(--accent-primary)' }} />
                    Frequency
                  </label>
                  <select
                    value={campaignSettings.frequency}
                    onChange={(e) => setCampaignSettings(prev => ({ ...prev, frequency: e.target.value }))}
                    className="input-field"
                    style={{ fontFamily: 'Geist Mono, monospace' }}
                  >
                    {FREQUENCY_OPTIONS.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label} - {option.description}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="flex items-center text-lg font-semibold mb-3" style={{ 
                    color: 'var(--text-primary)', 
                    fontFamily: 'Geist Mono, monospace' 
                  }}>
                    <Calendar size={20} className="mr-2" style={{ color: 'var(--accent-primary)' }} />
                    Duration
                  </label>
                  <select
                    value={campaignSettings.duration}
                    onChange={(e) => setCampaignSettings(prev => ({ ...prev, duration: e.target.value }))}
                    className="input-field"
                    style={{ fontFamily: 'Geist Mono, monospace' }}
                  >
                    {DURATION_OPTIONS.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label} - {option.description}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="flex items-center text-lg font-semibold mb-3" style={{ 
                    color: 'var(--text-primary)', 
                    fontFamily: 'Geist Mono, monospace' 
                  }}>
                    <BarChart3 size={20} className="mr-2" style={{ color: 'var(--accent-primary)' }} />
                    Content Mix
                  </label>
                  <select
                    value={campaignSettings.contentMix}
                    onChange={(e) => setCampaignSettings(prev => ({ ...prev, contentMix: e.target.value }))}
                    className="input-field"
                    style={{ fontFamily: 'Geist Mono, monospace' }}
                  >
                    {CONTENT_MIX_OPTIONS.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label} - {option.description}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Generate Button */}
          <div className="text-center">
            <button
              onClick={handleGenerate}
              disabled={!prompt.trim() || selectedPlatforms.length === 0 || isGenerating}
              className="btn-primary text-lg px-12 py-4 disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ fontFamily: 'Geist Mono, monospace' }}
            >
              {isGenerating ? (
                <div className="flex items-center justify-center space-x-3">
                  <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
                  <span>Generating Content...</span>
                </div>
              ) : (
                <div className="flex items-center justify-center space-x-2">
                  <Sparkles size={20} />
                  <span>Generate {mode === 'single' ? 'Post' : 'Campaign'}</span>
                </div>
              )}
            </button>
          </div>

          {/* Results */}
          {generatedContent && (
            <div className="space-y-8">
              {mode === 'single' ? (
                <div className="space-y-6">
                  {generatedContent.posts?.map((post: any, index: number) => (
                    <div key={post.id || index} className="card">
                      <div className="flex justify-between items-center mb-6">
                        <h3 className="text-xl font-bold flex items-center" style={{ 
                          color: 'var(--text-primary)',
                          fontFamily: 'Geist, sans-serif',
                          fontWeight: '700'
                        }}>
                          {(() => {
                            const platform = PLATFORMS[post.platform as keyof typeof PLATFORMS];
                            const IconComponent = platform?.icon;
                            return IconComponent ? (
                              <IconComponent size={24} className="mr-3" style={{ color: 'var(--accent-primary)' }} />
                            ) : null;
                          })()}
                          {PLATFORMS[post.platform as keyof typeof PLATFORMS]?.name}
                        </h3>
                        <span className={`px-3 py-1 rounded-lg text-sm font-semibold ${
                          post.status === 'completed' ? 'status-completed' :
                          post.status === 'failed' ? 'status-failed' :
                          'status-generating'
                        }`}>
                          {post.status}
                        </span>
                      </div>
                      
                      {post.mediaUrl && (
                        <div className="mb-6">
                          {post.type === 'image' ? (
                            <img 
                              src={post.mediaUrl} 
                              alt="Generated content" 
                              className="w-full h-auto rounded-xl border shadow-sm" 
                              style={{ 
                                borderColor: 'var(--border-subtle)', 
                                maxHeight: '400px', 
                                objectFit: 'cover' 
                              }}
                            />
                          ) : (
                            <video 
                              src={post.mediaUrl} 
                              controls 
                              className="w-full h-auto rounded-xl border shadow-sm" 
                              style={{ 
                                borderColor: 'var(--border-subtle)', 
                                maxHeight: '400px' 
                              }}
                            />
                          )}
                        </div>
                      )}
                      
                      <div className="mb-6">
                        <p className="text-base leading-relaxed mb-4" style={{ 
                          fontFamily: 'Geist Mono, monospace',
                          color: 'var(--text-primary)'
                        }}>
                          {post.caption}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {post.hashtags?.map((tag: string) => (
                            <span 
                              key={tag} 
                              className="px-3 py-1 rounded-lg text-sm font-medium"
                              style={{ 
                                backgroundColor: 'var(--accent-primary)',
                                color: 'var(--accent-text)',
                                fontFamily: 'Geist Mono, monospace'
                              }}
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <div className="flex gap-3">
                        <button
                          onClick={() => navigator.clipboard.writeText(post.caption)}
                          className="btn-secondary text-sm px-6 py-3 flex items-center space-x-2"
                          style={{ fontFamily: 'Geist Mono, monospace' }}
                        >
                          <Copy size={16} />
                          <span>Copy Caption</span>
                        </button>
                        {post.mediaUrl && (
                          <button
                            onClick={() => {
                              const link = document.createElement('a');
                              link.href = post.mediaUrl;
                              link.download = `post-${index + 1}.${post.type === 'image' ? 'jpg' : 'mp4'}`;
                              link.click();
                            }}
                            className="btn-secondary text-sm px-6 py-3 flex items-center space-x-2"
                            style={{ fontFamily: 'Geist Mono, monospace' }}
                          >
                            <Download size={16} />
                            <span>Download</span>
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-6">
                  {/* Campaign Strategy */}
                  <div className="card">
                    <h3 className="text-2xl font-bold mb-6" style={{ 
                      color: 'var(--text-primary)',
                      fontFamily: 'Geist, sans-serif',
                      fontWeight: '700'
                    }}>
                      Campaign Strategy
                    </h3>
                    <div className="space-y-6">
                      <div>
                        <h4 className="font-bold mb-3 text-lg" style={{ 
                          color: 'var(--text-primary)', 
                          fontFamily: 'Geist Mono, monospace' 
                        }}>
                          Overview
                        </h4>
                        <p className="text-base leading-relaxed" style={{ 
                          fontFamily: 'Geist Mono, monospace',
                          color: 'var(--text-secondary)'
                        }}>
                          {generatedContent.strategy?.overview}
                        </p>
                      </div>
                      <div>
                        <h4 className="font-bold mb-3 text-lg" style={{ 
                          color: 'var(--text-primary)', 
                          fontFamily: 'Geist Mono, monospace' 
                        }}>
                          Content Pillars
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {generatedContent.strategy?.contentPillars?.map((pillar: string) => (
                            <span 
                              key={pillar} 
                              className="px-4 py-2 rounded-lg text-sm font-medium"
                              style={{ 
                                backgroundColor: 'var(--accent-primary)',
                                color: 'var(--accent-text)',
                                fontFamily: 'Geist Mono, monospace'
                              }}
                            >
                              {pillar}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Generated Posts */}
                  <div className="card">
                    <h3 className="text-2xl font-bold mb-6" style={{ 
                      color: 'var(--text-primary)',
                      fontFamily: 'Geist, sans-serif',
                      fontWeight: '700'
                    }}>
                      Generated Posts ({generatedContent.posts?.length || 0})
                    </h3>
                    <div className="space-y-4">
                      {generatedContent.posts?.map((post: any, index: number) => (
                        <div key={post.id || index} className="border rounded-xl p-6" style={{ 
                          borderColor: 'var(--border-subtle)',
                          backgroundColor: 'var(--background)'
                        }}>
                          <div className="flex justify-between items-start mb-4">
                            <div className="flex items-center space-x-3">
                              <span className="font-bold text-lg" style={{ 
                                color: 'var(--text-primary)', 
                                fontFamily: 'Geist Mono, monospace' 
                              }}>
                                Post #{index + 1}
                              </span>
                              <span className="px-3 py-1 rounded-lg text-sm font-medium flex items-center space-x-1" style={{ 
                                backgroundColor: 'var(--background-secondary)',
                                color: 'var(--text-primary)',
                                fontFamily: 'Geist Mono, monospace'
                              }}>
                                {(() => {
                                  const platform = PLATFORMS[post.platform as keyof typeof PLATFORMS];
                                  const IconComponent = platform?.icon;
                                  return IconComponent ? (
                                    <IconComponent size={14} style={{ color: 'var(--accent-primary)' }} />
                                  ) : null;
                                })()}
                                <span>{PLATFORMS[post.platform as keyof typeof PLATFORMS]?.name}</span>
                              </span>
                              <span className="px-3 py-1 rounded-lg text-sm font-medium" style={{ 
                                backgroundColor: 'var(--accent-primary)',
                                color: 'var(--accent-text)',
                                fontFamily: 'Geist Mono, monospace'
                              }}>
                                {post.type}
                              </span>
                            </div>
                            <span className={`px-3 py-1 rounded-lg text-sm font-semibold ${
                              post.status === 'completed' ? 'status-completed' :
                              post.status === 'failed' ? 'status-failed' :
                              'status-generating'
                            }`}>
                              {post.status}
                            </span>
                          </div>
                          
                          {/* Media Display */}
                          {post.mediaUrl && (
                            <div className="mb-4">
                              {post.type === 'image' ? (
                                <img 
                                  src={post.mediaUrl} 
                                  alt="Generated content" 
                                  className="w-full h-auto rounded-lg border shadow-sm" 
                                  style={{ 
                                    borderColor: 'var(--border-subtle)', 
                                    maxHeight: '300px', 
                                    objectFit: 'cover' 
                                  }}
                                />
                              ) : post.type === 'video' ? (
                                <video 
                                  src={post.mediaUrl} 
                                  controls 
                                  className="w-full h-auto rounded-lg border shadow-sm" 
                                  style={{ 
                                    borderColor: 'var(--border-subtle)', 
                                    maxHeight: '300px' 
                                  }}
                                />
                              ) : null}
                            </div>
                          )}
                          
                          <p className="text-base mb-3 leading-relaxed" style={{ 
                            fontFamily: 'Geist Mono, monospace',
                            color: 'var(--text-primary)'
                          }}>
                            {post.caption}
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {post.hashtags?.slice(0, 5).map((tag: string) => (
                              <span 
                                key={tag} 
                                className="text-xs px-2 py-1 rounded-md"
                                style={{ 
                                  backgroundColor: 'var(--background-secondary)',
                                  color: 'var(--text-secondary)',
                                  fontFamily: 'Geist Mono, monospace'
                                }}
                              >
                                #{tag}
                              </span>
                            ))}
                            {post.hashtags && post.hashtags.length > 5 && (
                              <span className="text-xs" style={{ color: 'var(--text-placeholder)' }}>
                                +{post.hashtags.length - 5} more
                              </span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}