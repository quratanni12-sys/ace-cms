import type { CollectionConfig } from 'payload'

const esc = (v: unknown) =>
  String(v ?? '-')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')

export const Leads: CollectionConfig = {
  slug: 'leads',
  admin: { useAsTitle: 'name', defaultColumns: ['name', 'phone', 'courseInterest', 'createdAt'] },
  access: {
    create: () => true,
    read: ({ req }) => !!req.user,
    update: ({ req }) => !!req.user,
    delete: ({ req }) => !!req.user,
  },
  hooks: {
    afterChange: [
      async ({ doc, operation, req }) => {
        if (operation !== 'create' || !process.env.LEADS_NOTIFY_EMAIL) return doc
        try {
          await req.payload.sendEmail({
            to: process.env.LEADS_NOTIFY_EMAIL,
            ...(doc.email ? { replyTo: doc.email } : {}),
            subject: `New lead: ${doc.name}${doc.courseInterest ? ' - ' + doc.courseInterest : ''}`,
            html: `
              <h3>New lead received</h3>
              <p><b>Name:</b> ${esc(doc.name)}</p>
              <p><b>Phone:</b> ${esc(doc.phone)}</p>
              <p><b>Email:</b> ${esc(doc.email)}</p>
              <p><b>Course:</b> ${esc(doc.courseInterest)}</p>
              <p><b>Region:</b> ${esc(doc.region)}</p>
              <p><b>Message:</b> ${esc(doc.message)}</p>
              <p><b>Source page:</b> ${esc(doc.sourcePage)}</p>
            `,
          })
        } catch (err) {
          // the lead is already saved, only the email failed
          req.payload.logger.error(`Lead email failed: ${String(err)}`)
        }
        return doc
      },
    ],
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
