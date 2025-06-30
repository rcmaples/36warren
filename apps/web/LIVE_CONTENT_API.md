# Sanity Live Content API Implementation

This implementation adds Sanity's Live Content API to the Next.js application, enabling real-time content updates without page refreshes.

## ✅ What's Been Implemented

### 1. Core Live Content API Setup

- **API Version**: Updated to `2025-01-01` (Live Content API requires `v2021-03-25` or later)
- **Live Utilities**: Created `/lib/sanity/live.ts` with `defineLive` configuration  
- **Enhanced Fetch**: Updated `/lib/sanity/fetch.ts` for better caching with live content
- **SanityLive Component**: Added to root layout for real-time updates

### 2. Files Modified/Created

```
/lib/sanity/live.ts          # Live Content API utilities (NEW)
/lib/sanity/live-utils.ts    # Helper utilities (NEW)
/lib/sanity/api.ts           # Updated API version
/lib/sanity/fetch.ts         # Enhanced for live content  
/app/layout.tsx              # Added SanityLive component
/app/api/*/route.ts          # Enhanced API routes with live status
/app/api/live-status/route.ts # Live Content status endpoint (NEW)
```

### 3. How It Works

**The Live Content API uses a two-stage process:**

1. **Sync Tags**: Sanity returns sync tags with each response that identify specific content
2. **Live Updates**: The SanityLive component listens for changes and triggers updates when content matching the sync tags changes

**In your implementation:**
- API routes use enhanced `sanityFetch` with better caching (30s revalidation + 'sanity' tags)
- `SanityLive` component in layout provides real-time update capabilities
- Client-side components will automatically receive updates when content changes

## 🚀 Testing Live Updates

1. **Start your development server**: `npm run dev` or `pnpm dev`
2. **Open your app** - You'll see a green banner indicating Live Content API is active
3. **Open Sanity Studio** in another tab/window  
4. **Edit content** (timeline entries, settings, executive summary)
5. **Watch updates** appear in real-time without page refresh

## 📊 Monitoring

### Visual Indicators
- **Green banner**: Live Content API is active and working
- **API responses**: Include `meta.liveContentEnabled` status

### Debug Endpoint
- Visit `/api/live-status` to check Live Content API configuration
- Shows environment variables, recommendations, and status

### Console Logs
- Live Content API connection status
- Cache invalidation events
- Error handling and fallbacks

## ⚙️ Configuration

### Environment Variables
```env
# Required
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=your_dataset

# Optional (for draft mode/visual editing)
SANITY_API_READ_TOKEN=your_token

# Optional (defaults to 2025-01-01)
NEXT_PUBLIC_SANITY_API_VERSION=2025-01-01
```

### Performance Benefits
- **Selective Updates**: Only content that actually changed gets refetched
- **CDN Optimization**: Works with Sanity's global CDN
- **Framework Integration**: Leverages Next.js caching and revalidation
- **Reduced Revalidation**: 30s cache instead of 60s for better live content balance

## 🔧 Utilities

### Manual Cache Revalidation
```typescript
import { revalidateSanityContent } from '@/lib/sanity/live-utils'

// Force cache refresh
revalidateSanityContent()
```

### Check Configuration
```typescript
import { getLiveContentStatus } from '@/lib/sanity/live-utils'

const status = getLiveContentStatus()
console.log(status.isFullyConfigured) // true if properly set up
```

## 🐛 Troubleshooting

### Common Issues

1. **No Live Updates**
   - Check API version is v2021-03-25 or later ✅
   - Verify SanityLive component is in layout ✅
   - Ensure CORS is configured for your domain

2. **Performance Issues**  
   - Monitor API usage in Sanity dashboard
   - Current implementation uses 30s cache + live updates
   - Check `/api/live-status` for configuration issues

3. **Token Errors**
   - SANITY_API_READ_TOKEN is optional for public content
   - Required for draft mode and visual editing
   - Token needs viewer permissions

## 📈 Usage Limits

- Live connections are part of your Sanity plan
- API requests count toward your quota
- Automatic optimization prevents unnecessary requests
- Enhanced caching reduces API calls while maintaining live functionality

## 🎯 Best Practices

### When Live Content Shines
- **News/Blog sites**: Real-time article updates
- **E-commerce**: Inventory and pricing changes  
- **Events**: Live event information
- **Documentation**: Frequently updated content

### Implementation Notes
- SanityLive component works across all pages automatically
- API routes enhanced with Live Content metadata
- Backward compatible with existing data fetching patterns
- Ready for future optimization to full Server Components approach

The Live Content API is now active and will provide real-time content updates as you edit content in Sanity Studio! 🎉
