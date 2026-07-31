import { useState } from 'react'
import { Link } from 'react-router-dom'
import posts from '../data/posts.json'
import encouragements from '../data/encouragements.js'

function groupBySeries() {
  const groups = {}
  for (const post of posts) {
    if (!groups[post.series]) groups[post.series] = []
    groups[post.series].push(post)
  }
  return groups
}

const grouped = groupBySeries()
const seriesOrder = [...new Set(posts.map((p) => p.series))]

function Home() {
  const [message] = useState(
    () => encouragements[Math.floor(Math.random() * encouragements.length)],
  )

  return (
    <div className="home">
      <header className="home-header">
        <h1>Study Hub</h1>
        <p>Spring · Network · 운영체제 · Kubernetes 네트워킹 — 총 {posts.length}편</p>
      </header>
      <div className="series-cards">
        {seriesOrder.map((series) => {
          const seriesPosts = grouped[series]
          const meta = seriesPosts[0]
          return (
            <Link
              key={series}
              to={`/post/${seriesPosts[0].id}`}
              className="series-card"
              style={{ '--series-color': meta.seriesColor }}
            >
              <span className="series-card-label">{meta.seriesLabel}</span>
              <span className="series-card-count">{seriesPosts.length}편</span>
              <span className="series-card-cta">읽기 시작 &rarr;</span>
            </Link>
          )
        })}
      </div>
      <p className="home-encouragement">{message}</p>
    </div>
  )
}

export default Home
