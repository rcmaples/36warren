import {defineType} from 'sanity'

export const imageWithAlt = defineType({
  name: 'imageWithAlt',
  title: 'Image',
  type: 'image',
  options: {
    hotspot: true,
    aiAssist: {
      imageDescriptionField: 'alt',
    },
  },
  fields: [
    {
      name: 'alt',
      type: 'string',
      title: 'Alternative text',
    },
  ],
})
