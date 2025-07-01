import {DocumentTextIcon} from '@sanity/icons'
import {defineArrayMember, defineField, defineType} from 'sanity'

export const entryType = defineType({
  name: 'entry',
  title: 'Entry',
  type: 'document',
  description: 'A record or log entry that can be associated with one or more people',
  icon: DocumentTextIcon,
  groups: [
    {
      name: 'content',
      title: 'Content',
      default: true,
    },
  ],
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      description: 'Title or name of the entry',
      group: 'content',
      validation: (Rule) =>
        Rule.required().min(2).max(100).error('Name must be between 2 and 100 characters'),
    }),
    defineField({
      name: 'date',
      title: 'Date',
      type: 'date',
      description: 'When this entry occurred',
      group: 'content',
      initialValue: new Date().toISOString().slice(0, 10),
      validation: (Rule) => Rule.required().error('Date is required'),
    }),
    defineField({
      name: 'shortDescription',
      title: 'Short Description',
      type: 'string',
      description: 'Brief summary of the entry (max 200 characters)',
      group: 'content',
      validation: (Rule) =>
        Rule.required()
          .min(2)
          .max(200)
          .error('Short description must be between 2 and 200 characters'),
    }),
    defineField({
      name: 'fullDescription',
      title: 'Full Description',
      type: 'array',
      group: 'content',
      of: [{type: 'block'}],
    }),
    defineField({
      name: 'people',
      title: 'People',
      type: 'array',
      group: 'content',
      description: 'People associated with this entry',
      validation: (Rule) => Rule.required().min(1).error('At least one person is required'),
      of: [
        defineArrayMember({
          type: 'reference',
          to: [{type: 'person'}],
          options: {
            disableNew: false,
          },
        }),
      ],
    }),
    defineField({
      name: 'gallery',
      title: 'Gallery',
      type: 'array',
      group: 'content',
      of: [defineArrayMember({type: 'imageWithAlt'})],
      options: {
        layout: 'grid',
      },
    }),
    defineField({
      name: 'supportingDocuments',
      title: 'Supporting Documents',
      type: 'array',
      group: 'content',
      of: [
        {
          type: 'file',
          name: 'pdfFile',
          title: 'PDF File',
          options: {
            accept: 'application/pdf',
            storeOriginalFilename: true,
          },
        },
        {
          type: 'file',
          name: 'videoFile',
          title: 'Video File',
          options: {
            accept: 'video/*',
            storeOriginalFilename: true,
          },
        },
      ],
    }),
    defineField({
      name: 'impact',
      title: 'Impact Level',
      type: 'string',
      group: 'content',
      description: 'The impact level of this entry (optional)',
      options: {
        list: [
          {title: 'Low', value: 'low'},
          {title: 'Medium', value: 'medium'},
          {title: 'High', value: 'high'},
          {title: 'Critical', value: 'critical'},
        ],
        layout: 'radio',
      },
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'shortDescription',
      date: 'date',
      impact: 'impact',
      media: 'gallery.0',
    },
    prepare({title, subtitle, date, impact, media}) {
      return {
        title: title || 'Untitled Entry',
        subtitle: [
          date,
          impact ? `Impact: ${impact.charAt(0).toUpperCase() + impact.slice(1)}` : '',
          subtitle,
        ]
          .filter(Boolean)
          .join(' - '),
        media: media || DocumentTextIcon,
      }
    },
  },
  orderings: [
    {
      title: 'Date, New',
      name: 'dateDesc',
      by: [{field: 'date', direction: 'desc'}],
    },
    {
      title: 'Date, Old',
      name: 'dateAsc',
      by: [{field: 'date', direction: 'asc'}],
    },
    {
      title: 'Impact Level',
      name: 'impactDesc',
      by: [{field: 'impact', direction: 'desc'}],
    },
  ],
})
