import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const UNSPLASH_ACCESS_KEY = process.env.UNSPLASH_ACCESS_KEY
if (!UNSPLASH_ACCESS_KEY) {
  console.error('Missing UNSPLASH_ACCESS_KEY environment variable')
  process.exit(1)
}

const BLOG_DIR = path.join(process.cwd(), 'content', 'blog')
const PUBLIC_DIR = path.join(process.cwd(), 'public', 'blog')
const USED_IDS_PATH = path.join(PUBLIC_DIR, '_used-photo-ids.json')

interface UnsplashPhoto {
  id: string
  urls: { regular: string }
  user: { name: string; links: { html: string } }
}

function loadUsedIds(): Set<string> {
  if (fs.existsSync(USED_IDS_PATH)) {
    return new Set(JSON.parse(fs.readFileSync(USED_IDS_PATH, 'utf-8')))
  }
  return new Set()
}

function saveUsedIds(usedIds: Set<string>) {
  fs.writeFileSync(USED_IDS_PATH, JSON.stringify(Array.from(usedIds), null, 2))
}

async function getImageForArticle(
  query: string,
  usedIds: Set<string>
): Promise<{ url: string; id: string; credit: string } | null> {
  try {
    const res = await fetch(
      `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&orientation=landscape&per_page=10&client_id=${UNSPLASH_ACCESS_KEY}`
    )

    if (!res.ok) {
      console.error(`Unsplash API error: ${res.status} ${res.statusText}`)
      return null
    }

    const data = await res.json()

    if (!data.results || data.results.length === 0) {
      console.log(`  No results for query: "${query}"`)
      return null
    }

    // Find first photo not already used
    const photo = data.results.find((p: UnsplashPhoto) => !usedIds.has(p.id))

    if (!photo) {
      console.log(`  All results already used for query: "${query}" — trying fallback`)
      return null
    }

    return {
      url: photo.urls.regular,
      id: photo.id,
      credit: `Photo by ${photo.user.name} on Unsplash (${photo.user.links.html})`,
    }
  } catch (err) {
    console.error(`  Fetch error:`, err)
    return null
  }
}

async function downloadImage(url: string, outputPath: string): Promise<boolean> {
  try {
    const res = await fetch(url)
    if (!res.ok) return false
    const buffer = await res.arrayBuffer()
    fs.writeFileSync(outputPath, Buffer.from(buffer))
    return true
  } catch {
    return false
  }
}

async function main() {
  if (!fs.existsSync(PUBLIC_DIR)) {
    fs.mkdirSync(PUBLIC_DIR, { recursive: true })
  }

  const usedIds = loadUsedIds()
  const credits: Record<string, string> = {}

  const files = fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith('.mdx') || f.endsWith('.md'))

  console.log(`Found ${files.length} blog articles\n`)

  for (const file of files) {
    const slug = file.replace(/\.mdx?$/, '')
    const outputPath = path.join(PUBLIC_DIR, `${slug}.webp`)

    if (fs.existsSync(outputPath)) {
      console.log(`⏭  ${slug} — image already exists, skipping`)
      continue
    }

    const content = fs.readFileSync(path.join(BLOG_DIR, file), 'utf-8')
    const { data } = matter(content)

    // Priority: image_query > first keyword > title > fallback
    const queries = [
      data.image_query,
      Array.isArray(data.keywords) ? data.keywords[0] : data.keywords,
      data.title,
      'german law court justice',
    ].filter(Boolean) as string[]

    let photo = null
    for (const query of queries) {
      console.log(`🔍 ${slug} — searching: "${query}"`)
      photo = await getImageForArticle(query, usedIds)
      if (photo) break
    }

    if (!photo) {
      console.log(`✗  ${slug} — no unique image found\n`)
      continue
    }

    const success = await downloadImage(photo.url, outputPath)

    if (success) {
      usedIds.add(photo.id)
      saveUsedIds(usedIds)
      credits[slug] = photo.credit
      console.log(`✓  ${slug} — saved`)
      console.log(`   Credit: ${photo.credit}\n`)
    } else {
      console.log(`✗  ${slug} — download failed\n`)
    }

    // Rate limit: Unsplash free = 50 req/hour
    await new Promise((r) => setTimeout(r, 1500))
  }

  // Save credits file for attribution
  const creditsPath = path.join(PUBLIC_DIR, '_image-credits.json')
  const existingCredits = fs.existsSync(creditsPath)
    ? JSON.parse(fs.readFileSync(creditsPath, 'utf-8'))
    : {}
  fs.writeFileSync(
    creditsPath,
    JSON.stringify({ ...existingCredits, ...credits }, null, 2)
  )

  console.log('✅ Done! Credits saved to public/blog/_image-credits.json')
}

main()
