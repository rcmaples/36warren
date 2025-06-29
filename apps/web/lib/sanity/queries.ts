import {defineQuery} from 'next-sanity'

export const settingsQuery = defineQuery(`*[_type == "settings"][0]`)

// Entry queries for timeline
const entryFields = /* groq */ `
  _id,
  name,
  date,
  shortDescription,
  fullDescription,
  impact,
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

export const entriesQuery = defineQuery(`
  *[_type == "entry"] | order(date asc) {
    ${entryFields}
  }
`)

export const entryQuery = defineQuery(`
  *[_type == "entry" && _id == $id][0] {
    ${entryFields}
  }
`)

// Legacy blog post queries (keeping for backward compatibility)
const postFields = /* groq */ `
  _id,
  "status": select(_originalId in path("drafts.**") => "draft", "published"),
  "title": coalesce(title, "Untitled"),
  "slug": slug.current,
  excerpt,
  coverImage,
  "date": coalesce(date, _updatedAt),
  "author": author->{"name": coalesce(name, "Anonymous"), picture},
`

export const heroQuery = defineQuery(`
  *[_type == "post" && defined(slug.current)] | order(date desc, _updatedAt desc) [0] {
    content,
    ${postFields}
  }
`)

export const moreStoriesQuery = defineQuery(`
  *[_type == "post" && _id != $skip && defined(slug.current)] | order(date desc, _updatedAt desc) [0...$limit] {
    ${postFields}
  }
`)

export const postQuery = defineQuery(`
  *[_type == "post" && slug.current == $slug] [0] {
    content,
    ${postFields}
  }
`)
