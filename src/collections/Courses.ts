import type { CollectionConfig } from 'payload'

export const Courses: CollectionConfig = {
  slug: 'courses',
  admin: { useAsTitle: 'title' },
  access: { read: () => true },
  fields: [
    { name: 'title', type: 'text', required: true },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      admin: { description: 'Khali chhor dein, title se khud ban jayega' },
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
    { name: 'business', type: 'select', options: ['ACE Education', 'ACE Language Center'] },
    { name: 'category', type: 'select', options: ['IGCSE', 'A-Level', 'CBSE', 'IB', 'Homeschooling', 'Language', 'IELTS/PTE', 'Corporate English', 'Kids English'] },
    { name: 'region', type: 'select', hasMany: true, options: ['Malaysia', 'Bahrain'] },
    { name: 'mode', type: 'select', hasMany: true, options: ['Online', 'On-site', 'Home tuition'] },
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
  ],
}