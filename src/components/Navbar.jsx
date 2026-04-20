import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, Phone } from 'lucide-react'

import { motion, AnimatePresence } from 'framer-motion'

const links = [
  { to: '/', label: 'Home' },
  { to: '/listings', label: 'Search Homes' },
  { to: '/buy', label: 'Buy' },
  { to: '/sell', label: 'Sell' },
  { to: '/home-valuation', label: 'Home Value' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => setOpen(false), [pathname])

  const isHome = pathname === '/'
  const transparent = isHome && !scrolled

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${transparent ? 'bg-transparent' : 'bg-navy shadow-lg'}`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-20">
        <Link to="/" className="flex items-center gap-2">
          <span className="font-heading text-2xl font-bold text-gold">Power Team</span>
          <span className="font-heading text-2xl font-light text-white">Realty</span>
        </Link>

        <nav className="hidden lg:flex items-center gap-8">
          {links.map(l => (
            <Link
              key={l.to}
              to={l.to}
              className={`text-sm font-medium transition-colors duration-200 ${pathname === l.to ? 'text-gold' : 'text-white/90 hover:text-gold'}`}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-4">
          <a href="tel:9288998945" className="flex items-center gap-2 text-gold text-sm font-semibold hover:text-white transition-colors">
            <Phone size={16} />
            928-899-8945
          </a>
        </div>

        <button className="lg:hidden text-white p-2" onClick={() => setOpen(!open)}>
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-navy border-t border-white/10"
          >
            <div className="px-6 py-4 flex flex-col gap-4">
              {links.map(l => (
                <Link key={l.to} to={l.to} className={`text-base font-medium py-2 border-b border-white/10 ${pathname === l.to ? 'text-gold' : 'text-white'}`}>
                  {l.label}
                </Link>
              ))}
              <a href="tel:9288998945" className="flex items-center gap-2 text-gold font-semibold py-2">
                <Phone size={16} /> 928-899-8945
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
