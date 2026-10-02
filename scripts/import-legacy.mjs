import { readFileSync } from 'node:fs'

const CMS = process.env.CMS_URL || 'https://ace-cms.vercel.app'
const email = process.env.CMS_EMAIL
const password = process.env.CMS_PASSWORD
if (!email || !password) {
  console.error('Set CMS_EMAIL and CMS_PASSWORD first.')
  process.exit(1)
}

const posts = JSON.parse(readFileSync(new URL('./legacy-posts.json', import.meta.url), 'utf8'))

const login = await fetch(`${CMS}/api/users/login`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email, password }),
})
if (!login.ok) {
  console.error('Login failed:', login.status)
  process.exit(1)
}
const { token } = await login.json()
const auth = { 'Content-Type': 'application/json', Authorization: `JWT ${token}` }

for (const p of posts) {
  const check = await fetch(`${CMS}/api/posts?where[slug][equals]=${encodeURIComponent(p.slug)}&limit=1&depth=0`, {
    headers: auth,
  })
  const found = (await check.json()).docs?.length > 0
  if (found) {
    console.log('SKIP (already exists):', p.slug)
    continue
  }

  const res = await fetch(`${CMS}/api/posts`, {
    method: 'POST',
    headers: auth,
    body: JSON.stringify({
      title: p.title,
      slug: p.slug,
      business: 'ALC English',
      region: ['Malaysia'],
      excerpt: p.excerpt,
      contentHtml: p.contentHtml,
      status: 'published',
      meta: { title: p.title, description: p.metaDescription },
    }),
  })
  console.log(res.ok ? 'ADDED:' : `FAILED (${res.status}):`, p.slug)
  if (!res.ok) console.log(await res.text())
}
