import type { CollectionConfig } from 'payload'

export const Courses: CollectionConfig = {
  slug: 'courses',
  labels: { singular: 'Course', plural: 'Courses' },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'business', 'category', 'status'],
  },
  access: {
    read: ({ req }) => (req.user ? true : { status: { equals: 'published' } }),
  },
  fields: [
    { name: 'title', type: 'text', required: true },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      admin: { description: 'Leave empty, it is created from the title.' },
      hooks: {
        beforeValidate: [
          ({ value, data }) => {
            const source = value || data?.title
            if (!source) return value
            return String(source)
              .toLowerCase()
              .trim()
              .replace(/[^a-z0-9]+/g, '-')
              .replace(/^-+|-+$/g, '')
          },
        ],
      },
    },
    { name: 'business', type: 'select', options: ['ACE Education', 'ALC English'] },
    {
      name: 'category',
      type: 'select',
      options: [
        'IGCSE',
        'A-Level',
        'CBSE',
        'IB',
        'Homeschooling',
        'Language',
        'IELTS/PTE',
        'Corporate English',
        'Kids English',
        'Intensive English',
        'IELTS Preparation',
        'Academic English',
        'University Pathway',
        'English Speaking',
        'Business English',
        'TOEFL Preparation',
        'Short Camps',
      ],
    },
    { name: 'region', type: 'select', hasMany: true, options: ['Malaysia', 'Bahrain'] },
    { name: 'mode', type: 'select', hasMany: true, options: ['Online', 'On-site', 'Home tuition'] },
    {
      name: 'focusKeyword',
      type: 'text',
      admin: { description: 'Main keyword, for example: IELTS preparation course Kuala Lumpur' },
    },
    {
      name: 'summary',
      type: 'textarea',
      admin: { description: 'Short summary (about 150 characters). Shown on the course list and used as the default meta description.' },
    },
    {
      name: 'heroImage',
      type: 'upload',
      relationTo: 'media',
      admin: { description: 'Best size 1200x630.' },
    },
    {
      name: 'facts',
      type: 'group',
      admin: { description: 'Quick facts shown in a box at the top of the course page.' },
      fields: [
        { name: 'duration', type: 'text', admin: { description: 'For example: 8 weeks' } },
        { name: 'level', type: 'text', admin: { description: 'For example: Beginner to Advanced' } },
        { name: 'schedule', type: 'text', admin: { description: 'For example: Mon to Fri, 9am to 12pm' } },
        { name: 'intake', type: 'text', admin: { description: 'For example: Every month' } },
        { name: 'price', type: 'text', admin: { description: 'For example: From RM 1,200' } },
      ],
    },
    {
      name: 'highlights',
      type: 'array',
      admin: { description: 'Short bullet points: what the student gets.' },
      fields: [{ name: 'text', type: 'text', required: true }],
    },
    { name: 'description', type: 'richText' },
    {
      name: 'faqs',
      type: 'array',
      fields: [
        { name: 'question', type: 'text', required: true },
        { name: 'answer', type: 'textarea', required: true },
      ],
    },
    { name: 'status', type: 'select', defaultValue: 'draft', options: ['draft', 'published'] },
    {
      name: 'sortOrder',
      type: 'number',
      defaultValue: 100,
      admin: { position: 'sidebar', description: 'Smaller number is shown first on the course list.' },
    },
    {
      name: 'canonicalUrl',
      type: 'text',
      admin: { position: 'sidebar', description: 'Only fill this if the same page exists on another address.' },
    },
    {
      name: 'noindex',
      type: 'checkbox',
      defaultValue: false,
      admin: { position: 'sidebar', description: 'Tick to hide this course from Google.' },
    },
  ],
}
