
#  AI Social Media Campaign Generator

A complete, production-ready web application that generates AI-powered social media campaigns using **Gemini 2.0 Flash** and **Kie.ai** APIs. Create single posts or full campaigns with intelligent prompt enhancement, media generation, and platform-specific optimization.

![Social Media Campaign Tool](https://img.shields.io/badge/Next.js-14+-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5+-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3+-38B2AC?style=for-the-badge&logo=tailwind-css)
![Gemini AI](https://img.shields.io/badge/Gemini_2.0_Flash-AI-orange?style=for-the-badge)


# Creative & Marketing Stream - Cadence AI Campaign Generator

This folder represents the Creative and Marketing industry stream in the InnovAIte AI Organisational Design workforce analysis, and the documents within this folder contain research, integrations, workflows, and comprehensive analysis of AI implementation in creative workflows.

## Project Team

**Project Lead**: Danidu Karunarathne  
**Team Members**: 
- Minh Nguyen
- Arsheen Kaur  
- Jay Shrimpton

**Institution**: InnovAIte | AI Organisational Design  
**Academic Year**: 2025  
**Stream**: Creative and Marketing Stream

## Document Overview

The dot point list below introduces individual files and folders and their purpose:

1. **[Creative and Marketing Final Report.md](/creative-marketing/docs/Final_Report_Creative_Formatted.md)**: This is the comprehensive investigative report that identifies and evaluates the impact that utilizing AI tools will have on the creative and marketing workspace. This outlines the standard business structure and workflows of creative agencies and marketing teams, and demonstrates transformed workflows that integrate AI technologies to enhance content creation, campaign development, and cross-platform optimization, aiming to provide net positive impacts while minimizing disruption to creative processes.

2. **[MCP Problem Statement - Cadence Campaign Generator](/creative-marketing/docs/MCP_Problem_Cadence_Formatted.md)**: This document contains the MCP problem statement for the Cadence AI-powered social media campaign generation workflow. The workflow processes campaign briefs and produces comprehensive, platform-optimized content strategies for marketing professionals to deploy across Instagram, LinkedIn, Twitter/X, Facebook, TikTok, and YouTube.

3. **[Software Requirement Specification Document.md](/creative-marketing/docs/SRS_Cadence_Formatted.md)**: This is the Software Requirement Specification document which describes the purpose of the Cadence software, the description of the AI-powered campaign generation system, the requirements and needs of the software for creative teams, and the links between user stories and functional requirements. Contains comprehensive technical specifications for both single post and campaign generation modes.

4. **[Cadence Web Application](/creative-marketing/application/)**: This folder contains the Next.js 14-based web application for testing and deploying AI-powered campaign generation tools. The application is deployed and available for testing at **[https://cadence-campaign-generator.netlify.app](https://cadence-campaign-generator.netlify.app)**. To run locally, clone the repository, enter the application folder and run `npm install` then `npm run dev`, then head to `http://localhost:3000` in your browser.

5. **[Facts Extract Data](/creative-marketing/data/)**: This folder contains the structured data extraction from the Cadence project including platform constraints, performance metrics, API specifications, and technical architecture details sourced from actual implementation files.

6. **Cadence Campaign Generation "User Story" Demonstration**: [Video demonstration of dual-mode campaign generation workflow showing single post creation and comprehensive campaign development with platform-specific optimization]

7. **Cadence Full Workflow and Application Installation Guide**: [Comprehensive setup and deployment guide for the complete AI-powered campaign generation system including API configuration, platform integration, and compliance framework setup]

## Technical Architecture

The Cadence system implements a sophisticated serverless architecture built on Next.js 14 with Google Gemini 2.0 Flash AI integration. The system processes campaign briefs through intelligent prompt enhancement, routes requests to appropriate generation engines (single post vs. campaign mode), applies platform-specific optimization, and generates professional outputs including tagged PDFs, structured Markdown, and CSV exports.

### Platform Support Matrix

| Platform | Character Limit | Hashtag Limit | Content Focus | Optimization Level |
|----------|----------------|---------------|---------------|-------------------|
| Instagram | 2,200 chars | 30 hashtags | Visual storytelling | Full automation |
| LinkedIn | 3,000 chars | 5 hashtags | Professional content | Full automation |
| Twitter/X | 280 chars | 2 hashtags | Concise messaging | Full automation |
| Facebook | 63,206 chars | 30 hashtags | Long-form engagement | Full automation |
| TikTok/Reels | 150 chars | 20 hashtags | Short-form video | Full automation |
| YouTube | 5,000 chars | 15 hashtags | Video descriptions | Full automation |

## Academic Context

This project was developed as part of the InnovAIte AI Organisational Design initiative, investigating the transformative impact of artificial intelligence on traditional creative and marketing workflows. The research addresses critical industry challenges including:

- **Content Scalability Crisis**: The exponential increase in content volume demands across multiple social media platforms
- **Platform Fragmentation Complexity**: Managing diverse platform requirements, character limits, and optimization strategies
- **Brand Consistency Challenges**: Maintaining coherent brand voice and visual identity across varied content formats
- **Workflow Bottlenecks**: Traditional creative processes struggling to meet modern content velocity requirements

The Cadence solution represents a practical implementation of AI-assisted creative workflows, demonstrating measurable improvements in content generation speed (from days to minutes), consistency maintenance, and resource optimization while preserving creative quality and brand authenticity.

## Compliance and Ethical Framework

The project implements comprehensive governance frameworks addressing:

- **Intellectual Property Lineage**: Complete audit trails tracking content generation from brief to final output
- **AI Transparency**: Configurable disclosure options for AI assistance in content creation
- **Brand Safety**: Automated compliance validation against brand guidelines and platform policies  
- **Accessibility Standards**: WCAG 2.1 AA compliance with tagged PDFs and alt-text generation
- **Data Protection**: Privacy-preserving AI workflows with minimal data retention and secure processing

## Performance Metrics

**Current System Performance**:
- API Response Time: 2-5 seconds average for single posts
- Campaign Generation: 15+ seconds for comprehensive strategies  
- System Uptime: 99.9% reliability target
- Bundle Size: 138KB optimized main application
- Platform Coverage: 6 major social media platforms with full optimization

**Quality Assurance Metrics**:
- Brand Voice Consistency: Automated scoring with human review gates
- Content Approval Rate: Target ≥90% first-pass approval
- Compliance Detection: 100% accuracy for configured brand guidelines
- User Satisfaction: Target ≥4.5/5 rating from creative professionals

## Future Development Roadmap

**Phase 1**: Enhanced AI model integration with specialized creative training
**Phase 2**: Real-time collaboration features for distributed creative teams  
**Phase 3**: Advanced analytics integration with campaign performance tracking
**Phase 4**: Enterprise-grade security and compliance features for large organizations

---

**Project Classification**: High Priority | AI Ready | ROI Validated  
**Academic Institution**: InnovAIte AI Organisational Design  
**Documentation Standard**: Academic Grade with Industry Parity Depth  
**Last Updated**: September 2025










