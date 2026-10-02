import type { CollectionConfig } from 'payload'

export const Posts: CollectionConfig = {
  slug: 'posts',
  labels: { singular: 'Blog', plural: 'Blogs' },
  admin: { useAsTitle: 'title', defaultColumns: ['title', 'business', 'status'] },
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
    { name: 'business', type: 'select', options: ['ACE Education', 'ALC English'] },
    { name: 'region', type: 'select', hasMany: true, options: ['Malaysia', 'Bahrain', 'Gulf'] },
    { name: 'focusKeyword', type: 'text' },
    { name: 'excerpt', type: 'textarea' },
    { name: 'content', type: 'richText' },
    { name: 'contentHtml', type: 'textarea', admin: { description: 'Optional raw HTML. If filled, it is shown instead of Content.' } },
    { name: 'status', type: 'select', defaultValue: 'draft', options: ['draft', 'published'] },
  ],
}