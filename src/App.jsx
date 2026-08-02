import { useState } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import Sidebar from './components/Sidebar.jsx'
import Home from './components/Home.jsx'
import PostView from './components/PostView.jsx'

function App() {
  const [navOpen, setNavOpen] = useState(false)

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
      </header>

      {navOpen && (
        <div className="sidebar-backdrop" onClick={() => setNavOpen(false)} aria-hidden="true" />
      )}

      <Sidebar isOpen={navOpen} onNavigate={() => setNavOpen(false)} />

      <main className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/post/:id" element={<PostView />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
