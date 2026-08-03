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

function Home({ readIds }) {
  const [message] = useState(
    () => encouragements[Math.floor(Math.random() * encouragements.length)],
  )

  const totalRead = posts.filter((p) => readIds?.has(p.id)).length

  return (
    <div className="home">
      <header className="home-header">
        <h1>Study Hub</h1>
        <p>
          {seriesOrder.length}개 시리즈, 총 {posts.length}편
          {totalRead > 0 ? ` · ${totalRead}편 읽음` : ''}
        </p>
      </header>
      <div className="series-cards">
        {seriesOrder.map((series) => {
          const seriesPosts = grouped[series]
          const meta = seriesPosts[0]
          const readCount = seriesPosts.filter((p) => readIds?.has(p.id)).length
          const percent = Math.round((readCount / seriesPosts.length) * 100)
          const nextPost = seriesPosts.find((p) => !readIds?.has(p.id)) ?? seriesPosts[0]
          return (
            <Link
              key={series}
              to={`/post/${nextPost.id}`}
              className="series-card"
              style={{ '--series-color': meta.seriesColor }}
            >
              <span className="series-card-label">{meta.seriesLabel}</span>
              <span className="series-card-count">
                {readCount}/{seriesPosts.length}편 읽음
              </span>
              <span className="series-card-progress">
                <span
                  className="series-card-progress-fill"
                  style={{ width: `${percent}%` }}
                />
              </span>
              <span className="series-card-cta">
                {readCount === 0 ? '읽기 시작' : readCount === seriesPosts.length ? '다시 보기' : '이어보기'} &rarr;
              </span>
            </Link>
          )
        })}
      </div>
      <p className="home-encouragement">{message}</p>
    </div>
  )
}

export default Home
