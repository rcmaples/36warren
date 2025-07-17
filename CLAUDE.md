# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Turborepo monorepo documenting the 36 Warren Street storm drain investigation. It consists of a Next.js frontend and Sanity CMS backend for content management.

## Architecture

### Monorepo Structure
- **apps/web**: Next.js application with App Router
- **apps/studio**: Sanity Studio for content management
- **packages/eslint-config**: Shared ESLint configuration
- **packages/typescript-config**: Shared TypeScript configuration

### Technology Stack
- **Frontend**: Next.js 15 with App Router, React 19, TypeScript
- **Styling**: Tailwind CSS with custom Timeline components
- **CMS**: Sanity CMS with custom schema types
- **Package Manager**: pnpm with workspace configuration
- **Build Tool**: Turborepo for monorepo orchestration

## Common Development Commands

### Development
```bash
pnpm dev                    # Start all development servers
pnpm build                  # Build all applications
pnpm lint                   # Lint all packages
pnpm lint:fix              # Fix linting issues
pnpm typecheck             # Type check all packages
pnpm test                  # Run tests
pnpm format                # Format code with Prettier
```

### Sanity-specific Commands
```bash
pnpm sanity:deploy         # Deploy Sanity Studio
pnpm sanity:typegen        # Generate TypeScript types from schema
```

### Individual App Commands
```bash
# In apps/web
next dev --turbopack       # Start Next.js with Turbopack
next build && next-sitemap # Build and generate sitemap
next lint                  # Lint web app
tsc --noEmit              # Type check web app

# In apps/studio
sanity dev                 # Start Sanity Studio
sanity build              # Build studio
sanity deploy             # Deploy studio
sanity typegen generate   # Generate types
```

## Content Management

### Sanity Schema Architecture
- **entry**: Main document type for timeline entries with people references, galleries, and impact levels
- **person**: People involved in the investigation
- **executiveSummary**: Single executive summary document
- **settings**: Site-wide settings
- **imageWithAlt**: Reusable image type with alt text

### Key Schema Patterns
- All schema types use `defineType`, `defineField`, and `defineArrayMember`
- Images include `hotspot: true` for cropping
- References are always arrays, never single references
- Preview configurations show contextual information
- Validation rules with meaningful error messages

### Content Queries
Located in `apps/web/lib/sanity/queries.ts`:
- `ENTRIES_QUERY`: All timeline entries ordered by date
- `ENTRY_QUERY`: Single entry by ID
- `EXEC_SUMMARY_QUERY`: Executive summary content
- `SETTINGS_QUERY`: Site settings

## Frontend Architecture

### Key Components
- **Timeline**: Main investigation timeline (`apps/web/app/components/Timeline/`)
- **PortableText**: Sanity rich text rendering
- **StructuredData**: SEO structured data
- **ErrorBoundary**: Error handling

### Data Flow
- Sanity Live for real-time updates
- Next.js App Router with server components
- Dynamic OG image generation
- Comprehensive SEO metadata

## Development Guidelines

### Code Standards
- Follow existing Prettier configuration (no semicolons, single quotes)
- Use TypeScript strictly
- Maintain component colocation in Timeline module
- Follow Sanity best practices from `.cursor/sanity.mdc`

### Sanity Development
- Always run `pnpm sanity:typegen` after schema changes
- Use proper GROQ query formatting with `defineQuery`
- Keep schema types in separate files with named exports
- Include icons, previews, and validation for all document types

### Testing
- Use Vitest for testing (configured in root `vitest.config.ts`)
- Test coverage available with `@vitest/coverage-v8`

## Environment Variables

### Required for Web App
- `NEXT_PUBLIC_SANITY_PROJECT_ID=mrsdi6mo`
- `NEXT_PUBLIC_SANITY_DATASET=36warren`
- `SANITY_API_READ_TOKEN=` (for live updates)

### Required for Studio
- `SANITY_STUDIO_PROJECT_ID=mrsdi6mo`
- `SANITY_STUDIO_DATASET=36warren`
- `SANITY_STUDIO_HOST=` (for custom studio URL)

## Special Features

### Timeline Implementation
- Interactive timeline with year navigation
- Modal overlays for detailed entries
- People indicators and avatars
- Image galleries with carousel functionality
- Responsive design with custom CSS modules

### SEO Optimization
- Dynamic OG image generation
- Comprehensive structured data
- Sitemap generation with `next-sitemap`
- Geographic targeting for Atlanta area

### Content Structure
This project documents municipal infrastructure failure, focusing on:
- Chronological timeline of events
- People involved (officials, contractors, etc.)
- Supporting documentation and evidence
- Impact assessment and financial implications