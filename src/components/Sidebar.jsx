import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import posts from '../data/posts.json'

const seriesOrder = [...new Set(posts.map((p) => p.series))]

function groupBySeries() {
  const groups = {}
  for (const post of posts) {
    if (!groups[post.series]) groups[post.series] = []
    groups[post.series].push(post)
  }
  return groups
}

const grouped = groupBySeries()

function Sidebar() {
  const { id: activeId } = useParams()
  const [openSeries, setOpenSeries] = useState(() => {
    const activePost = posts.find((p) => p.id === activeId)
    return new Set(activePost ? [activePost.series] : seriesOrder)
  })

  const toggle = (series) => {
    setOpenSeries((prev) => {
      const next = new Set(prev)
      if (next.has(series)) next.delete(series)
      else next.add(series)
      return next
    })
  }

  return (
    <aside className="sidebar">
      <Link to="/" className="sidebar-brand">
        Study Hub
      </Link>
      <nav className="sidebar-nav">
        {seriesOrder.map((series) => {
          const seriesPosts = grouped[series]
          const meta = seriesPosts[0]
          const isOpen = openSeries.has(series)
          return (
            <div key={series} className="series-group">
              <button
                type="button"
                className="series-header"
                style={{ '--series-color': meta.seriesColor }}
                onClick={() => toggle(series)}
              >
                <span className="series-dot" />
                <span className="series-label">{meta.seriesLabel}</span>
                <span className="series-count">{seriesPosts.length}</span>
                <span className={`series-chevron ${isOpen ? 'open' : ''}`}>
                  &#9662;
                </span>
              </button>
              {isOpen && (
                <ul className="series-list">
                  {seriesPosts.map((post) => (
                    <li key={post.id}>
                      <Link
                        to={`/post/${post.id}`}
                        className={`series-post-link ${
                          post.id === activeId ? 'active' : ''
                        }`}
                      >
                        {post.indexInSeries}. {post.title.replace(/^\[[^\]]+\]\s*/, '')}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )
        })}
      </nav>
    </aside>
  )
}

export default Sidebar
