import { useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import WhatsAppFloat from './components/WhatsAppFloat'
import BackToTop from './components/BackToTop'
import Home from './pages/Home'
import Properties from './pages/Properties'
import About from './pages/About'
import Contact from './pages/Contact'
import ManageProperties from './pages/ManageProperties'
import NotFound from './pages/NotFound'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'smooth' }) }, [pathname])
  return null
}

export default function App() {
  const location = useLocation()
  const hasHeroNavbar = ['/', '/properties', '/about', '/contact'].includes(location.pathname)
  return (
    <>
      <ScrollToTop />
      <Navbar variant={hasHeroNavbar ? 'hero' : 'default'} />
      <main>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/properties" element={<Properties />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/manage" element={<ManageProperties />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AnimatePresence>
      </main>
      <Footer />
      <WhatsAppFloat />
      <BackToTop />
    </>
  )
}
