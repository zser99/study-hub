import { useState } from 'react'
import { Link } from 'react-router-dom'
import posts from '../data/posts.json'
import encouragements from '../data/encouragements.js'
import quizzes from '../data/quizzes.js'

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
          const hasQuiz = Boolean(quizzes[series])
          return (
            <div
              key={series}
              className="series-card"
              style={{ '--series-color': meta.seriesColor }}
            >
              <Link to={`/post/${nextPost.id}`} className="series-card-main">
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
              {hasQuiz && (
                <Link to={`/quiz/${series}`} className="series-card-quiz">
                  📝 쪽지시험 보기
                </Link>
              )}
            </div>
          )
        })}
      </div>
      <p className="home-encouragement">{message}</p>

      <footer className="home-oss">
        <p>
          Study Hub는 오픈소스 프로젝트입니다. 오탈자 수정부터 새 글·시리즈 추가, 기능
          개선까지 어떤 형태의 기여도 환영합니다.
        </p>
        <a
          href="https://github.com/rlaxoehd4234/study-hub"
          target="_blank"
          rel="noopener noreferrer"
          className="home-oss-link"
        >
          GitHub에서 기여하기 &rarr;
        </a>
        <p className="home-credits">
          만든 사람들 — 판교 9반 YYM · JSY · JEH · KSH · PJM · KTD
        </p>
      </footer>
    </div>
  )
}

export default Home
