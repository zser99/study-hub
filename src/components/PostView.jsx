import { useEffect, useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import posts from '../data/posts.json'
import { useScrollProgress } from '../hooks/useScrollProgress.js'

const remarkPlugins = [remarkGfm]
const rehypePlugins = [rehypeRaw]

function PostView({ onRead }) {
  const { id } = useParams()
  const scrollPercent = useScrollProgress()
  const [text, setText] = useState('')
  const [status, setStatus] = useState('loading')

  const post = posts.find((p) => p.id === id)
  const index = posts.findIndex((p) => p.id === id)
  const prevPost = index > 0 ? posts[index - 1] : null
  const nextPost = index >= 0 && index < posts.length - 1 ? posts[index + 1] : null

  useEffect(() => {
    if (!post) {
      setStatus('not-found')
      return
    }
    setStatus('loading')
    fetch(`${import.meta.env.BASE_URL}${post.path}`)
      .then((res) => {
        if (!res.ok) throw new Error('fetch failed')
        return res.text()
      })
      .then((md) => {
        setText(md)
        setStatus('ready')
        onRead?.(post.id)
      })
      .catch(() => setStatus('error'))
    window.scrollTo(0, 0)
  }, [post])

  const seriesDir = post ? post.path.slice(0, post.path.lastIndexOf('/')) : ''

  // 렌더마다 새 함수를 넘기면 React가 <img>를 매번 언마운트/재마운트해
  // 스크롤 중 이미지가 다시 로드되며 깜빡인다. seriesDir 기준으로 고정한다.
  const markdownComponents = useMemo(
    () => ({
      img: ({ src, alt }) => {
        const isAbsolute = /^(https?:|data:)/.test(src ?? '') || src?.startsWith('/')
        const resolvedSrc = isAbsolute
          ? src
          : `${import.meta.env.BASE_URL}${seriesDir}/${src.replace(/^\.\//, '')}`
        return <img src={resolvedSrc} alt={alt} loading="lazy" />
      },
    }),
    [seriesDir],
  )

  if (!post) {
    return (
      <div className="post-view">
        <p>존재하지 않는 글입니다.</p>
        <Link to="/">홈으로 돌아가기</Link>
      </div>
    )
  }

  return (
    <article className="post-view">
      <div className="reading-progress-track" aria-hidden="true">
        <div className="reading-progress-fill" style={{ width: `${scrollPercent}%` }} />
      </div>
      <div className="post-meta">
        <span className="post-series-badge" style={{ '--series-color': post.seriesColor }}>
          {post.seriesLabel}
        </span>
        <span className="post-index">
          {post.indexInSeries} / {posts.filter((p) => p.series === post.series).length}
        </span>
      </div>

      {status === 'loading' && <p className="post-status">불러오는 중...</p>}
      {status === 'error' && <p className="post-status">글을 불러오지 못했습니다.</p>}

      {status === 'ready' && (
        <div className="markdown-body">
          <ReactMarkdown
            remarkPlugins={remarkPlugins}
            rehypePlugins={rehypePlugins}
            components={markdownComponents}
          >
            {text}
          </ReactMarkdown>
        </div>
      )}

      <nav className="post-pager">
        {prevPost ? (
          <Link to={`/post/${prevPost.id}`} className="pager-link prev">
            <span className="pager-direction">&larr; 이전 글</span>
            <span className="pager-title">{prevPost.title}</span>
          </Link>
        ) : (
          <span />
        )}
        {nextPost ? (
          <Link to={`/post/${nextPost.id}`} className="pager-link next">
            <span className="pager-direction">다음 글 &rarr;</span>
            <span className="pager-title">{nextPost.title}</span>
          </Link>
        ) : (
          <span />
        )}
      </nav>
    </article>
  )
}

export default PostView
