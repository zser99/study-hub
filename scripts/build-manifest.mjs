// public/content 디렉터리를 스캔해서 src/data/posts.json 매니페스트를 생성한다.
import { readdirSync, readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const contentRoot = join(__dirname, '..', 'public', 'content')
const outDir = join(__dirname, '..', 'src', 'data')
const outFile = join(outDir, 'posts.json')

const seriesMeta = {
  java: { label: 'Java', color: '#c2410c', order: 1 },
  spring: { label: 'Spring', color: '#1a73a8', order: 2 },
  network: { label: 'Network', color: '#2e7d32', order: 3 },
  os: { label: '운영체제', color: '#b8860b', order: 4 },
  k8s: { label: 'Kubernetes', color: '#7b3fa0', order: 5 },
  linux: { label: 'Linux', color: '#dd4814', order: 6 },
  docker: { label: 'Docker', color: '#2496ed', order: 7 },
  db: { label: '데이터베이스', color: '#0f766e', order: 8 },
  dataai: { label: '데이터와 AI', color: '#db2777', order: 9 },
  agilemsa: { label: '애자일 & MSA', color: '#4338ca', order: 10 },
  frontend: { label: '프론트엔드', color: '#d97706', order: 11 }
}

function extractTitle(mdText, fallback) {
  const lines = mdText.split('\n')
  for (const line of lines) {
    const trimmed = line.trim()
    if (trimmed.startsWith('# ')) {
      return trimmed.replace(/^#\s+/, '').trim()
    }
  }
  return fallback
}

const posts = []

for (const seriesKey of Object.keys(seriesMeta)) {
  const dir = join(contentRoot, seriesKey)
  if (!existsSync(dir)) continue
  const files = readdirSync(dir).filter((f) => f.endsWith('.md')).sort()
  files.forEach((file, idx) => {
    const fullPath = join(dir, file)
    const text = readFileSync(fullPath, 'utf-8')
    const title = extractTitle(text, file)
    const slug = file.replace(/\.md$/, '')
    posts.push({
      id: `${seriesKey}-${slug}`,
      series: seriesKey,
      seriesLabel: seriesMeta[seriesKey].label,
      seriesColor: seriesMeta[seriesKey].color,
      seriesOrder: seriesMeta[seriesKey].order,
      indexInSeries: idx + 1,
      slug,
      title,
      path: `content/${seriesKey}/${file}`
    })
  })
}

posts.sort((a, b) => {
  if (a.seriesOrder !== b.seriesOrder) return a.seriesOrder - b.seriesOrder
  return a.indexInSeries - b.indexInSeries
})

if (!existsSync(outDir)) mkdirSync(outDir, { recursive: true })
writeFileSync(outFile, JSON.stringify(posts, null, 2), 'utf-8')

console.log(`생성 완료: ${posts.length}개 포스트 → ${outFile}`)
