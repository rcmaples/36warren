import {defineQuery} from 'next-sanity'

export const SETTINGS_QUERY = defineQuery(`*[_type == "settings"][0]`)

export const EXEC_SUMMARY_QUERY = defineQuery(`
  *[_type == "executiveSummary"][0] {
    title,
    subtitle,
    caseOverview,
    timelineSection,
    documentedDamages,
    financialImpact,
    municipalNegligence,
    evidence,
    conclusion
  }
`)

// Entry queries for timeline
const ENTRY_FIELDS_QUERY = /* groq */ `
  _id,
  name,
  slug,
  date,
  shortDescription,
  fullDescription,
  impact,
  seo {
    metaTitle,
    metaDescription,
    keywords
  },
  location {
    address,
    coordinates,
    relatedAreas
  },
  gallery[] {
    asset,
    alt,
    hotspot,
    crop
  },
  people[]-> {
    _id,
    name,
    jobTitle,
    department,
    email,
    avatar {
      asset,
      alt,
      hotspot,
      crop
    }
  }
`

export const ENTRIES_QUERY = defineQuery(`
  *[_type == "entry"] | order(date asc) {
    ${ENTRY_FIELDS_QUERY}
  }
`)

export const ENTRY_QUERY = defineQuery(`
  *[_type == "entry" && _id == $id][0] {
    ${ENTRY_FIELDS_QUERY}
  }
`)

export const ENTRY_BY_ID_QUERY = defineQuery(`
  *[_type == "entry" && _id == $id][0] {
    ${ENTRY_FIELDS_QUERY}
  }
`)

// Legacy blog post queries (keeping for backward compatibility)
const POST_FIELDS_QUERY = /* groq */ `
  _id,
  "status": select(_originalId in path("drafts.**") => "draft", "published"),
  "title": coalesce(title, "Untitled"),
  "slug": slug.current,
  excerpt,
  coverImage,
  "date": coalesce(date, _updatedAt),
  "author": author->{"name": coalesce(name, "Anonymous"), picture},
`

export const HERO_QUERY = defineQuery(`
  *[_type == "post" && defined(slug.current)] | order(date desc, _updatedAt desc) [0] {
    content,
    ${POST_FIELDS_QUERY}
  }
`)

export const MORE_STORIES_QUERY = defineQuery(`
  *[_type == "post" && _id != $skip && defined(slug.current)] | order(date desc, _updatedAt desc) [0...$limit] {
    ${POST_FIELDS_QUERY}
  }
`)

export const POST_QUERY = defineQuery(`
  *[_type == "post" && slug.current == $slug] [0] {
    content,
    ${POST_FIELDS_QUERY}
  }
`)
