# 🚀 AI Social Media Campaign Generator

A complete, production-ready web application that generates AI-powered social media campaigns using **Gemini 2.0 Flash** and **Kie.ai** APIs. Create single posts or full campaigns with intelligent prompt enhancement, media generation, and platform-specific optimization.

![Social Media Campaign Tool](https://img.shields.io/badge/Next.js-14+-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5+-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3+-38B2AC?style=for-the-badge&logo=tailwind-css)
![Gemini AI](https://img.shields.io/badge/Gemini_2.0_Flash-AI-orange?style=for-the-badge)

## ✨ Features

### 🎯 Content Generation
- **Single Post Generation** - Create optimized posts for multiple platforms
- **Full Campaign Generation** - Complete campaigns with strategy and scheduling
- **AI-Enhanced Prompts** - Automatically improve your prompts for better results
- **Platform-Specific Optimization** - Tailored content for each social media platform

### 🎨 Media Generation
- **AI Image Generation** - High-quality images using Kie.ai
- **AI Video Generation** - Short-form videos for social media
- **Multiple Aspect Ratios** - Optimized for different platforms
- **Real-time Progress Tracking** - See generation progress in real-time

### 📱 Platform Support
- **Instagram** - Posts, Stories, Reels optimization
- **TikTok/Reels/Shorts** - Vertical video content
- **LinkedIn** - Professional content
- **Twitter/X** - Short-form text and media
- **Facebook** - Multi-format content
- **YouTube** - Long-form video content

### 🛠️ Technical Features
- **Rate Limiting** - Built-in API rate limiting and queue management
- **Error Handling** - Comprehensive error handling and retry logic
- **Real-time Updates** - WebSocket support for live progress updates
- **Responsive Design** - Mobile-first, modern UI with Tailwind CSS
- **TypeScript** - Full type safety and IntelliSense support

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Gemini API Key ([Get here](https://aistudio.google.com/apikey))
- Kie.ai API Key ([Get here](https://kieai.erweima.ai))

### One-Command Setup

```bash
# Clone and setup
git clone <your-repo-url>
cd social-media-campaign-tool
chmod +x setup.sh
./setup.sh
```

The setup script will:
- ✅ Install all dependencies
- ✅ Create environment configuration
- ✅ Set up project structure
- ✅ Run type checking and linting
- ✅ Build the project
- ✅ Create documentation

### Manual Setup

```bash
# Install dependencies
npm install

# Create environment file
cp env.template .env.local

# Edit .env.local with your API keys
# GEMINI_API_KEY=your_gemini_api_key_here
# KIE_API_KEY=your_kie_api_key_here

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
social-media-campaign-tool/
├── app/
│   ├── api/                    # API routes
│   │   ├── generate/          # Content generation endpoints
│   │   ├── enhance/           # Prompt enhancement
│   │   ├── media/             # Media generation
│   │   └── webhook/           # Webhook handlers
│   ├── components/            # React components
│   │   ├── ui/               # shadcn/ui components
│   │   ├── campaign/         # Campaign-specific components
│   │   ├── media/            # Media components
│   │   └── platform/         # Platform components
│   ├── lib/                  # Utilities and services
│   │   ├── api/              # API integrations
│   │   ├── services/         # Business logic
│   │   ├── utils/            # Helper functions
│   │   ├── constants.ts      # App constants
│   │   └── types.ts          # TypeScript types
│   ├── globals.css           # Global styles
│   ├── layout.tsx            # Root layout
│   └── page.tsx              # Main page
├── public/                   # Static assets
├── package.json              # Dependencies
├── tsconfig.json             # TypeScript config
├── tailwind.config.js        # Tailwind config
├── next.config.js            # Next.js config
├── setup.sh                  # Setup script
├── Dockerfile                # Docker configuration
├── docker-compose.yml        # Docker Compose
├── vercel.json               # Vercel deployment
└── README.md                 # This file
```

## 🔧 Configuration

### Environment Variables

Create a `.env.local` file with the following variables:

```bash
# Required API Keys
GEMINI_API_KEY=your_gemini_api_key_here
KIE_API_KEY=your_kie_api_key_here

# Application URL
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Optional: Database
# DATABASE_URL=postgresql://user:password@localhost:5432/social_media_tool

# Optional: Analytics
# NEXT_PUBLIC_ANALYTICS_ID=your_analytics_id

# Rate Limiting
GEMINI_RATE_LIMIT=60
KIE_RATE_LIMIT=100

# Feature Flags
ENABLE_VIDEO_GENERATION=true
ENABLE_CAMPAIGN_MODE=true
ENABLE_PROMPT_ENHANCEMENT=true
```

### Platform Configuration

Each platform has specific limits and requirements:

```typescript
const PLATFORMS = {
  instagram: {
    captionLength: 2200,
    hashtagLimit: 30,
    videoLength: 60,
    imageRatio: '1:1'
  },
  tiktok: {
    captionLength: 150,
    hashtagLimit: 20,
    videoLength: 30,
    imageRatio: '9:16'
  },
  // ... more platforms
};
```

## 🎨 Usage Examples

### Single Post Generation

```typescript
const response = await fetch('/api/generate/single', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    prompt: 'Launch our new AI-powered productivity app',
    platforms: ['instagram', 'linkedin', 'twitter'],
    contentType: 'image',
    enhancePrompt: true
  })
});
```

### Campaign Generation

```typescript
const response = await fetch('/api/generate/campaign', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    prompt: 'Tech startup product launch campaign',
    platforms: ['instagram', 'linkedin', 'twitter'],
    frequency: 'daily',
    duration: '2-weeks',
    contentMix: 'balanced',
    enhancePrompt: true
  })
});
```

### Media Generation

```typescript
// Generate image
const imageResponse = await fetch('/api/media/image', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    prompt: 'Modern tech workspace with AI elements',
    aspectRatio: '16:9'
  })
});

// Generate video
const videoResponse = await fetch('/api/media/video', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    prompt: 'Product demo animation',
    duration: 8,
    quality: 'fast'
  })
});
```

## 🚀 Deployment

### Vercel (Recommended)

1. **Push to GitHub:**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Deploy to Vercel:**
   - Connect your GitHub repository to Vercel
   - Add environment variables in Vercel dashboard
   - Deploy automatically

3. **Environment Variables in Vercel:**
   ```
   GEMINI_API_KEY=your_key_here
   KIE_API_KEY=your_key_here
   NEXT_PUBLIC_APP_URL=https://your-app.vercel.app
   ```

### Docker

```bash
# Build image
docker build -t social-media-tool .

# Run container
docker run -p 3000:3000 \
  -e GEMINI_API_KEY=your_key_here \
  -e KIE_API_KEY=your_key_here \
  social-media-tool
```

### Docker Compose

```bash
# Create .env.local with your API keys
cp env.template .env.local

# Start services
docker-compose up -d
```

### Railway/Render/Netlify

The project includes configuration files for:
- Railway (`railway.json`)
- Render (Dockerfile)
- Netlify (`netlify.toml`)

## 🧪 Development

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript type checking
npm run test         # Run tests (when implemented)
```

### Adding New Platforms

1. **Update constants:**
   ```typescript
   // app/lib/constants.ts
   export const PLATFORMS = {
     // ... existing platforms
     newplatform: {
       id: 'newplatform',
       name: 'New Platform',
       icon: '🆕',
       limits: {
         captionLength: 1000,
         hashtagLimit: 10,
         videoLength: 60,
         imageRatio: '16:9'
       }
     }
   };
   ```

2. **Update UI components:**
   - Add platform to selection interface
   - Update content display components
   - Add platform-specific styling

### Adding New Content Types

1. **Update types:**
   ```typescript
   // app/lib/types.ts
   export type ContentType = 'image' | 'video' | 'text' | 'carousel' | 'story';
   ```

2. **Update generation logic:**
   - Add content type handling in services
   - Update API routes
   - Add UI components

## 🔒 Security

### API Key Security
- Never commit API keys to version control
- Use environment variables for all sensitive data
- Implement key rotation policies
- Monitor API usage and costs

### Input Validation
- Sanitize all user inputs
- Implement request size limits
- Validate file uploads
- Use rate limiting

### Error Handling
- Don't expose sensitive information in errors
- Log errors securely
- Implement proper error boundaries
- Use try-catch blocks appropriately

## 📊 Monitoring & Analytics

### Built-in Monitoring
- API rate limit tracking
- Generation success/failure rates
- Performance metrics
- Error logging

### Recommended Tools
- **Vercel Analytics** - Performance monitoring
- **Sentry** - Error tracking
- **Google Analytics** - Usage analytics
- **Uptime Robot** - Uptime monitoring

## 🤝 Contributing

1. **Fork the repository**
2. **Create a feature branch:**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Make your changes**
4. **Run tests and linting:**
   ```bash
   npm run lint
   npm run type-check
   npm run build
   ```
5. **Commit your changes:**
   ```bash
   git commit -m 'Add amazing feature'
   ```
6. **Push to the branch:**
   ```bash
   git push origin feature/amazing-feature
   ```
7. **Open a Pull Request**

### Development Guidelines
- Follow TypeScript best practices
- Use meaningful commit messages
- Add tests for new features
- Update documentation
- Follow the existing code style

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - React framework
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework
- [shadcn/ui](https://ui.shadcn.com/) - UI components
- [Google Gemini](https://ai.google.dev/) - AI content generation
- [Kie.ai](https://kieai.erweima.ai/) - Media generation
- [Lucide React](https://lucide.dev/) - Icons

## 📞 Support

- **Documentation**: [Project Wiki](link-to-wiki)
- **Issues**: [GitHub Issues](link-to-issues)
- **Discussions**: [GitHub Discussions](link-to-discussions)
- **Email**: support@yourcompany.com

## 🗺️ Roadmap

### Phase 1 (Current)
- ✅ Single post generation
- ✅ Campaign generation
- ✅ Media generation
- ✅ Platform optimization

### Phase 2 (Next)
- [ ] Content calendar view
- [ ] Scheduled posting
- [ ] Analytics integration
- [ ] Team collaboration

### Phase 3 (Future)
- [ ] A/B testing
- [ ] Advanced analytics
- [ ] Custom AI models
- [ ] White-label solution

---

**Made with ❤️ for the social media community**

*Generate amazing content, grow your audience, and scale your social media presence with AI.*
