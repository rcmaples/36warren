import {DocumentTextIcon} from '@sanity/icons'
import {defineArrayMember, defineField, defineType} from 'sanity'

export const executiveSummary = defineType({
  name: 'executiveSummary',
  title: 'Executive Summary',
  type: 'document',
  icon: DocumentTextIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      initialValue: 'Executive Summary',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'string',
      initialValue: 'Municipal Storm Drain Infrastructure Failure',
      validation: (rule) => rule.required(),
    }),

    // Case Overview Section
    defineField({
      name: 'caseOverview',
      title: 'Case Overview',
      type: 'object',
      fields: [
        defineField({
          name: 'title',
          title: 'Section Title',
          type: 'string',
          initialValue: 'Case Overview',
        }),
        defineField({
          name: 'content',
          title: 'Content',
          type: 'text',
          rows: 4,
        }),
      ],
    }),

    // Timeline Section
    defineField({
      name: 'timelineSection',
      title: 'Timeline Section',
      type: 'object',
      fields: [
        defineField({
          name: 'title',
          title: 'Section Title',
          type: 'string',
          initialValue: 'Timeline',
        }),
        defineField({
          name: 'events',
          title: 'Timeline Events',
          type: 'array',
          of: [
            defineArrayMember({
              type: 'object',
              fields: [
                defineField({
                  name: 'date',
                  title: 'Date',
                  type: 'string',
                }),
                defineField({
                  name: 'description',
                  title: 'Description',
                  type: 'string',
                }),
              ],
              preview: {
                select: {
                  title: 'date',
                  subtitle: 'description',
                },
              },
            }),
          ],
        }),
      ],
    }),

    // Documented Damages Section
    defineField({
      name: 'documentedDamages',
      title: 'Documented Damages',
      type: 'object',
      fields: [
        defineField({
          name: 'title',
          title: 'Section Title',
          type: 'string',
          initialValue: 'Documented Damages',
        }),
        defineField({
          name: 'damages',
          title: 'Damage Items',
          type: 'array',
          of: [
            defineArrayMember({
              type: 'string',
            }),
          ],
        }),
      ],
    }),

    // Financial Impact Section
    defineField({
      name: 'financialImpact',
      title: 'Financial Impact',
      type: 'object',
      fields: [
        defineField({
          name: 'title',
          title: 'Section Title',
          type: 'string',
          initialValue: 'Financial Impact',
        }),
        defineField({
          name: 'items',
          title: 'Financial Items',
          type: 'array',
          of: [
            defineArrayMember({
              type: 'object',
              fields: [
                defineField({
                  name: 'label',
                  title: 'Label',
                  type: 'string',
                }),
                defineField({
                  name: 'value',
                  title: 'Value',
                  type: 'string',
                }),
              ],
              preview: {
                select: {
                  title: 'label',
                  subtitle: 'value',
                },
              },
            }),
          ],
        }),
      ],
    }),

    // Municipal Negligence Section
    defineField({
      name: 'municipalNegligence',
      title: 'Municipal Negligence',
      type: 'object',
      fields: [
        defineField({
          name: 'title',
          title: 'Section Title',
          type: 'string',
          initialValue: 'Municipal Negligence',
        }),
        defineField({
          name: 'items',
          title: 'Negligence Items',
          type: 'array',
          of: [
            defineArrayMember({
              type: 'string',
            }),
          ],
        }),
      ],
    }),

    // Evidence Section
    defineField({
      name: 'evidence',
      title: 'Evidence',
      type: 'object',
      fields: [
        defineField({
          name: 'title',
          title: 'Section Title',
          type: 'string',
          initialValue: 'Evidence',
        }),
        defineField({
          name: 'stats',
          title: 'Evidence Statistics',
          type: 'array',
          of: [
            defineArrayMember({
              type: 'object',
              fields: [
                defineField({
                  name: 'number',
                  title: 'Number',
                  type: 'string',
                }),
                defineField({
                  name: 'label',
                  title: 'Label',
                  type: 'string',
                }),
              ],
              preview: {
                select: {
                  title: 'number',
                  subtitle: 'label',
                },
              },
            }),
          ],
        }),
      ],
    }),

    // Conclusion Section
    defineField({
      name: 'conclusion',
      title: 'Conclusion',
      type: 'object',
      fields: [
        defineField({
          name: 'title',
          title: 'Section Title',
          type: 'string',
          initialValue: 'Conclusion',
        }),
        defineField({
          name: 'content',
          title: 'Content',
          type: 'text',
          rows: 4,
        }),
      ],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Executive Summary',
        subtitle: 'Case summary and overview',
      }
    },
  },
})
