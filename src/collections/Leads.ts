import type { CollectionConfig } from 'payload'

export const Leads: CollectionConfig = {
  slug: 'leads',
  admin: { useAsTitle: 'name', defaultColumns: ['name', 'phone', 'courseInterest', 'createdAt'] },
  access: {
    create: () => true,
    read: ({ req }) => !!req.user,
    update: ({ req }) => !!req.user,
    delete: ({ req }) => !!req.user,
  },
  fields: [
    { name: 'name', type: 'text', required: true },
    { name: 'phone', type: 'text' },
    { name: 'email', type: 'email' },
    { name: 'courseInterest', type: 'text' },
    { name: 'region', type: 'select', options: ['Malaysia', 'Bahrain', 'Other'] },
    { name: 'message', type: 'textarea' },
    { name: 'sourcePage', type: 'text' },
    { name: 'leadStatus', type: 'select', defaultValue: 'new', options: ['new', 'contacted', 'enrolled', 'closed'] },
  ],
}