import { useMemo, useState } from 'react'
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
  const [query, setQuery] = useState('')
  const [openSeries, setOpenSeries] = useState(() => {
    const activePost = posts.find((p) => p.id === activeId)
    return new Set(activePost ? [activePost.series] : [])
  })

  const trimmedQuery = query.trim().toLowerCase()
  const isSearching = trimmedQuery.length > 0

  const filteredGrouped = useMemo(() => {
    if (!isSearching) return grouped
    const result = {}
    for (const series of seriesOrder) {
      const matches = grouped[series].filter((post) =>
        post.title.toLowerCase().includes(trimmedQuery),
      )
      if (matches.length > 0) result[series] = matches
    }
    return result
  }, [trimmedQuery, isSearching])

  const visibleSeries = isSearching ? Object.keys(filteredGrouped) : seriesOrder

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
      <div className="sidebar-search">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="글 제목 검색..."
          aria-label="글 제목 검색"
        />
      </div>
      <nav className="sidebar-nav">
        {isSearching && visibleSeries.length === 0 && (
          <p className="sidebar-search-empty">검색 결과가 없습니다.</p>
        )}
        {visibleSeries.map((series) => {
          const seriesPosts = isSearching ? filteredGrouped[series] : grouped[series]
          const meta = grouped[series][0]
          const isOpen = isSearching || openSeries.has(series)
          return (
            <div key={series} className="series-group">
              <button
                type="button"
                className="series-header"
                style={{ '--series-color': meta.seriesColor }}
                onClick={() => toggle(series)}
                disabled={isSearching}
              >
                <span className="series-dot" />
                <span className="series-label">{meta.seriesLabel}</span>
                <span className="series-count">{seriesPosts.length}</span>
                {!isSearching && (
                  <span className={`series-chevron ${isOpen ? 'open' : ''}`}>
                    &#9662;
                  </span>
                )}
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
