/** @type {import('next-sitemap').IConfig} */
import {getAbsoluteOGImageURL, OG_CONFIGS} from './lib/og/utils.js'

export default {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://36warren.com',
  generateRobotsTxt: false, // We have custom robots.txt
  generateIndexSitemap: false,
  changefreq: 'daily',
  priority: 0.7,
  sitemapSize: 5000,

  // Exclude non-existent pages
  exclude: [
    '/entry/*', // Remove until entry pages are created
    '/api/*',
    '/studio/*',
    '/_next/*',
  ],

  // Custom pages with specific priorities
  transform: async (config, path) => {
    // Home page gets highest priority
    if (path === '/') {
      return {
        loc: path,
        changefreq: 'daily',
        priority: 1.0,
        lastmod: new Date().toISOString(),
        images: [
          {
            loc: getAbsoluteOGImageURL(OG_CONFIGS.home),
            title: '36 Warren Street Storm Drain Investigation',
            caption: 'Documentation of municipal infrastructure failure',
          },
        ],
      }
    }

    // Summary page gets high priority
    if (path === '/summary') {
      return {
        loc: path,
        changefreq: 'weekly',
        priority: 0.9,
        lastmod: new Date().toISOString(),
        images: [
          {
            loc: getAbsoluteOGImageURL(OG_CONFIGS.summary),
            title: 'Executive Summary - 36 Warren Street Investigation',
          },
        ],
      }
    }

    // Location page gets high priority
    if (path === '/location') {
      return {
        loc: path,
        changefreq: 'monthly',
        priority: 0.9,
        lastmod: new Date().toISOString(),
      }
    }

    // Future: Entry pages will get medium priority when implemented
    // if (path.startsWith('/entry/')) {
    //   return {
    //     loc: path,
    //     changefreq: 'monthly',
    //     priority: 0.8,
    //     lastmod: new Date().toISOString(),
    //   }
    // }

    return {
      loc: path,
      changefreq: config.changefreq,
      priority: config.priority,
      lastmod: new Date().toISOString(),
    }
  },

  additionalPaths: async (config) => [
    await config.transform(config, '/'),
    await config.transform(config, '/summary'),
    await config.transform(config, '/location'),
  ],
}
