import { useState } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import Sidebar from './components/Sidebar.jsx'
import Home from './components/Home.jsx'
import PostView from './components/PostView.jsx'
import QuizPage from './components/QuizPage.jsx'
import { useTheme } from './hooks/useTheme.js'
import { useReadPosts } from './hooks/useReadPosts.js'

function App() {
  const [navOpen, setNavOpen] = useState(false)
  const [theme, toggleTheme] = useTheme()
  const [readIds, markRead] = useReadPosts()

  return (
    <div className="layout">
      <header className="mobile-topbar">
        <button
          type="button"
          className="mobile-menu-btn"
          aria-label="메뉴 열기"
          onClick={() => setNavOpen(true)}
        >
          <span />
          <span />
          <span />
        </button>
        <Link to="/" className="mobile-topbar-brand" onClick={() => setNavOpen(false)}>
          Study Hub
        </Link>
        <button
          type="button"
          className="theme-toggle mobile-theme-toggle"
          aria-label={theme === 'dark' ? '라이트 모드로 전환' : '다크 모드로 전환'}
          onClick={toggleTheme}
        >
          {theme === 'dark' ? '☀️' : '🌙'}
        </button>
      </header>

      {navOpen && (
        <div className="sidebar-backdrop" onClick={() => setNavOpen(false)} aria-hidden="true" />
      )}

      <Sidebar
        isOpen={navOpen}
        onNavigate={() => setNavOpen(false)}
        theme={theme}
        onToggleTheme={toggleTheme}
        readIds={readIds}
      />

      <main className="content">
        <Routes>
          <Route path="/" element={<Home readIds={readIds} />} />
          <Route path="/post/:id" element={<PostView onRead={markRead} />} />
          <Route path="/quiz/:series" element={<QuizPage />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
