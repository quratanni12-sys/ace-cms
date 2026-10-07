import type { CollectionConfig } from 'payload'

// Counts words inside Lexical JSON (used for reading time)
const countWords = (node: any): number => {
  if (!node) return 0
  if (typeof node.text === 'string') return node.text.trim().split(/\s+/).filter(Boolean).length
  return Array.isArray(node.children)
    ? node.children.reduce((sum: number, c: any) => sum + countWords(c), 0)
    : 0
}

export const Posts: CollectionConfig = {
  slug: 'posts',
  labels: { singular: 'Blog', plural: 'Blogs' },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'business', 'status', 'publishedDate'],
  },
  access: {
    // Logged-in admins see everything, the public only sees published posts
    read: ({ req }) => (req.user ? true : { status: { equals: 'published' } }),
  },
  hooks: {
    beforeChange: [
      ({ data }) => {
        if (!data) return data

        // reading time: contentHtml first, otherwise rich text
        const words = data.contentHtml
          ? String(data.contentHtml).replace(/<[^>]*>/g, ' ').trim().split(/\s+/).filter(Boolean).length
          : countWords(data.content?.root)
        data.readingTime = Math.max(1, Math.round(words / 200))

        // publish date is set the first time a post is published
        if (data.status === 'published' && !data.publishedDate) {
          data.publishedDate = new Date().toISOString()
        }
        return data
      },
    ],
  },
  fields: [
    { name: 'title', type: 'text', required: true },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      admin: { description: 'Leave empty, it is created from the title. Keep it short and use the main keyword.' },
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
    {
      name: 'focusKeyword',
      type: 'text',
      admin: { description: 'Main keyword. Use it in the title, the first paragraph, one heading and the meta description.' },
    },
    {
      name: 'excerpt',
      type: 'textarea',
      admin: { description: 'Short summary (about 150 characters). Shown on the blog list and used as the default meta description.' },
    },
    {
      name: 'featuredImage',
      type: 'upload',
      relationTo: 'media',
      admin: { description: 'Used on the blog list, at the top of the post and when the post is shared. Best size 1200x630.' },
    },
    { name: 'content', type: 'richText' },
    {
      name: 'contentHtml',
      type: 'textarea',
      admin: { description: 'Optional raw HTML. If this is filled, it is shown instead of Content.' },
    },
    {
      name: 'faqs',
      type: 'array',
      admin: { description: 'Optional. Shown at the end of the post and added as FAQ rich results for Google.' },
      fields: [
        { name: 'question', type: 'text', required: true },
        { name: 'answer', type: 'textarea', required: true },
      ],
    },
    { name: 'status', type: 'select', defaultValue: 'draft', options: ['draft', 'published'] },
    { name: 'publishedDate', type: 'date', admin: { position: 'sidebar', date: { pickerAppearance: 'dayAndTime' } } },
    { name: 'author', type: 'text', defaultValue: 'ALC English Team', admin: { position: 'sidebar' } },
    { name: 'category', type: 'text', admin: { position: 'sidebar', description: 'For example: Study in Malaysia' } },
    { name: 'readingTime', type: 'number', admin: { position: 'sidebar', readOnly: true, description: 'Minutes, calculated automatically' } },
    {
      name: 'canonicalUrl',
      type: 'text',
      admin: { position: 'sidebar', description: 'Only fill this if the same article exists on another address.' },
    },
    {
      name: 'noindex',
      type: 'checkbox',
      defaultValue: false,
      admin: { position: 'sidebar', description: 'Tick to hide this post from Google.' },
    },
  ],
}
