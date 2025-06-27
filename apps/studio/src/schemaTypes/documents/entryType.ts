import {DocumentTextIcon} from '@sanity/icons'
import {defineArrayMember, defineField, defineType} from 'sanity'

export const entryType = defineType({
  name: 'entry',
  title: 'Entry',
  type: 'document',
  description: 'A record or log entry that can be associated with one or more people',
  icon: DocumentTextIcon,
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      description: 'Title or name of the entry',
      validation: (Rule) => Rule.required().min(2).max(100),
    }),
    defineField({
      name: 'date',
      title: 'Date',
      type: 'datetime',
      description: 'When this entry occurred',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'shortDescription',
      title: 'Short Description',
      type: 'string',
      description: 'Brief summary of the entry (max 200 characters)',
      validation: (Rule) => Rule.required().min(2).max(200),
    }),
    defineField({
      name: 'fullDescription',
      title: 'Full Description',
      type: 'text',
      description: 'Detailed description of the entry',
      validation: (Rule) => Rule.required().min(10),
      rows: 5,
    }),
    defineField({
      name: 'people',
      title: 'People',
      type: 'array',
      description: 'People associated with this entry',
      validation: (Rule) => Rule.required().min(1),
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
      name: 'impact',
      title: 'Impact Level',
      type: 'string',
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
    },
    prepare({title, subtitle, date, impact}) {
      return {
        title: title || 'Untitled Entry',
        subtitle: [
          new Date(date).toLocaleDateString(),
          impact ? `Impact: ${impact.charAt(0).toUpperCase() + impact.slice(1)}` : '',
          subtitle,
        ]
          .filter(Boolean)
          .join(' - '),
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
