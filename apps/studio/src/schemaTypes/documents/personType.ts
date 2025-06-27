import {UserIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const personType = defineType({
  name: 'person',
  title: 'Person',
  type: 'document',
  description:
    'Represents a person in the organization with their contact information and role details',
  icon: UserIcon,
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      description: 'Full name of the person',
      validation: (Rule) => Rule.required().min(2).max(100),
    }),
    defineField({
      name: 'jobTitle',
      title: 'Job Title',
      type: 'string',
      description: 'Current job title or role in the organization',
      validation: (Rule) => Rule.required().min(2).max(100),
    }),
    defineField({
      name: 'department',
      title: 'Department',
      type: 'string',
      description: 'Department or division the person works in',
      validation: (Rule) => Rule.required().min(2).max(100),
    }),
    defineField({
      name: 'phoneNumber',
      title: 'Phone Number',
      type: 'string',
      description: 'Contact phone number (optional)',
      validation: (Rule) =>
        Rule.custom((phoneNumber) => {
          if (!phoneNumber) return true // Optional field
          const phoneRegex = /^\+?[\d\s-()]{10,}$/
          return phoneRegex.test(phoneNumber) || 'Please enter a valid phone number'
        }),
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
      description: 'Professional email address',
      validation: (Rule) => Rule.required().email().error('Please enter a valid email address'),
    }),
    defineField({
      name: 'avatar',
      title: 'Avatar',
      type: 'image',
      description: 'Profile picture of the person (optional)',
      options: {
        hotspot: true,
        storeOriginalFilename: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
          description: 'Brief description of the image for accessibility and SEO',
          validation: (Rule) => Rule.required().min(2).max(100),
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'jobTitle',
      media: 'avatar',
    },
    prepare({title, subtitle, media}) {
      return {
        title: title || 'Unnamed Person',
        subtitle: subtitle || 'No job title',
        media,
      }
    },
  },
})
