// src/App.jsx
// Root component with React Router. Particles span the entire app.
// Routes:
//   /            → Main single-page site
//   /gallery/:id → Gallery detail page

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useTheme } from '@/hooks/useTheme'
import ParticleBackground from '@/components/particles/ParticleBackground'
import Navbar       from '@/components/Navbar'
import Hero         from '@/components/Hero'
import About        from '@/components/About'
import Services     from '@/components/Services'
import Menu         from '@/components/Menu'
import Gallery      from '@/components/Gallery'
import Testimonials from '@/components/Testimonials'
import QRCode       from '@/components/QRCode'
import Contact      from '@/components/Contact'
import Footer       from '@/components/Footer'
import GalleryDetail from '@/pages/GalleryDetail'

// ── Main single-page layout ───────────────────────────────────────────────────
function MainLayout({ isDark, toggleTheme }) {
  return (
    <>
      <Navbar isDark={isDark} toggleTheme={toggleTheme} />
      <main className="pt-14 lg:pt-0 lg:pl-20 xl:pl-56 relative z-10">
        <Hero />
        <About />
        <Services />
        <Menu />
        <Gallery />
        <Testimonials />
        <QRCode />
        <Contact />
        <Footer />
      </main>
    </>
  )
}

// ── Root app ──────────────────────────────────────────────────────────────────
export default function App() {
  const { isDark, toggleTheme } = useTheme()

  return (
    <BrowserRouter>
      {/* Particles sit behind everything, respond to dark/light mode */}
      <ParticleBackground isDark={isDark} />

      <Routes>
        <Route path="/" element={<MainLayout isDark={isDark} toggleTheme={toggleTheme} />} />
        <Route path="/gallery/:id" element={<GalleryDetail />} />
        {/* Catch-all → home */}
        <Route path="*" element={<MainLayout isDark={isDark} toggleTheme={toggleTheme} />} />
      </Routes>
    </BrowserRouter>
  )
}
