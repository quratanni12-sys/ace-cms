import { vercelPostgresAdapter } from '@payloadcms/db-vercel-postgres'
import { lexicalEditor, EXPERIMENTAL_TableFeature } from '@payloadcms/richtext-lexical'
import { seoPlugin } from '@payloadcms/plugin-seo'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Posts } from './collections/Posts'
import { Courses } from './collections/Courses'
import { Leads } from './collections/Leads'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const allowedOrigins = [
  'http://localhost:3000',
  process.env.SITE_URL,
  process.env.CMS_URL,
].filter(Boolean) as string[]

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Media, Posts, Courses, Leads],
  editor: lexicalEditor({
  features: ({ defaultFeatures }) => [...defaultFeatures, EXPERIMENTAL_TableFeature()],
}),
  secret: process.env.PAYLOAD_SECRET || '',
  cors: allowedOrigins,
  csrf: allowedOrigins,
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: vercelPostgresAdapter({
    schemaName: 'cms',
    pool: {
      connectionString: process.env.POSTGRES_URL || '',
    },
  }),
  sharp,
  plugins: [
    seoPlugin({
      collections: ['posts', 'courses'],
      uploadsCollection: 'media',
    }),
  ],
})