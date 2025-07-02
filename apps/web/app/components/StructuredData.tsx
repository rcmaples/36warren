interface StructuredDataProps {
  type?: 'website' | 'investigation' | 'article'
  title?: string
  description?: string
  address?: {
    streetAddress: string
    addressLocality: string
    addressRegion: string
    postalCode: string
  }
  datePublished?: string
  dateModified?: string
}

export default function StructuredData({
  type = 'website',
  title = '36 Warren Street Storm Drain Investigation',
  description = 'Documentation of municipal storm drain infrastructure failure at 36 Warren Street NE, Atlanta',
  address = {
    streetAddress: '36 Warren Street NE',
    addressLocality: 'Atlanta',
    addressRegion: 'GA',
    postalCode: '30317',
  },
  datePublished,
  dateModified,
}: StructuredDataProps) {
  // Base organization schema
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: '36 Warren Street Investigation',
    url: 'https://36warren.com',
    description: 'Documentation project for municipal infrastructure accountability',
    foundingDate: '2024',
    knowsAbout: [
      'Storm Drain Infrastructure',
      'Municipal Accountability',
      'Property Rights',
      'Infrastructure Failure Documentation',
    ],
    areaServed: {
      '@type': 'City',
      name: 'Atlanta',
      addressRegion: 'GA',
    },
  }

  // Breadcrumb schema
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://36warren.com',
      },
      ...(type === 'article'
        ? [
            {
              '@type': 'ListItem',
              position: 2,
              name: 'Executive Summary',
              item: 'https://36warren.com/summary',
            },
          ]
        : []),
    ],
  }

  // Investigation-specific schema
  const investigationSchema =
    type === 'investigation'
      ? {
          '@context': 'https://schema.org',
          '@type': 'CreativeWork',
          name: title,
          description: description,
          url: 'https://36warren.com',
          inLanguage: 'en-US',
          dateCreated: '2024',
          dateModified: dateModified || new Date().toISOString(),
          about: {
            '@type': 'Place',
            name: '36 Warren Street Storm Drain System',
            address: {
              '@type': 'PostalAddress',
              streetAddress: address.streetAddress,
              addressLocality: address.addressLocality,
              addressRegion: address.addressRegion,
              postalCode: address.postalCode,
              addressCountry: 'US',
            },
            geo: {
              '@type': 'GeoCoordinates',
              latitude: 33.7539,
              longitude: -84.326,
            },
          },
          mainEntity: {
            '@type': 'Problem',
            name: 'Municipal Storm Drain Infrastructure Failure',
            description: 'Systematic failure of storm water management infrastructure',
            location: {
              '@type': 'Place',
              address: {
                '@type': 'PostalAddress',
                streetAddress: address.streetAddress,
                addressLocality: address.addressLocality,
                addressRegion: address.addressRegion,
              },
            },
          },
          keywords: [
            '36 warren street ne',
            '36 warren st atlanta',
            'storm drain failure',
            'infrastructure failure',
            'municipal negligence',
            'flooding atlanta',
            'property damage',
            'city of atlanta department of watershed management',
            'atlanta storm water problems',
            'warren street flooding',
          ],
          audience: {
            '@type': 'Audience',
            audienceType: [
              'Property Owners',
              'Municipal Officials',
              'Legal Professionals',
              'Journalists',
              'Residents',
            ],
          },
        }
      : null

  // Website schema
  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: title,
    description: description,
    url: 'https://36warren.com',
    inLanguage: 'en-US',
  }

  // Article schema
  const articleSchema =
    type === 'article'
      ? {
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: title,
          description: description,
          url: 'https://36warren.com',
          datePublished: datePublished,
          dateModified: dateModified || new Date().toISOString(),
          author: {
            '@type': 'Person',
            name: 'Property Owner',
          },
          publisher: {
            '@type': 'Organization',
            name: '36 Warren Street Investigation',
            url: 'https://36warren.com',
          },
          inLanguage: 'en-US',
        }
      : null

  const schemas = [
    organizationSchema,
    breadcrumbSchema,
    investigationSchema || articleSchema || websiteSchema,
  ].filter(Boolean)

  return (
    <>
      {schemas.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{__html: JSON.stringify(schema, null, 2)}}
        />
      ))}
    </>
  )
}
