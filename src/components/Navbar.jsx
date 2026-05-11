import { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, Phone, Search, FileText, Key, CheckCircle, ChevronDown, Home, Calendar } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const buyDropdownItems = [
  { to: '/listings', icon: <Search size={18} className="text-gold shrink-0" />, label: 'Browse Homes', desc: 'Search all active Arizona listings' },
  { to: '/buy', icon: <FileText size={18} className="text-gold shrink-0" />, label: "Buyer's Guide", desc: 'Step-by-step path to your new home' },
  { to: '/contact', icon: <CheckCircle size={18} className="text-gold shrink-0" />, label: 'Get Pre-Approved', desc: 'Connect with trusted local lenders' },
  { to: '/buy', icon: <Home size={18} className="text-gold shrink-0" />, label: 'First-Time Buyers', desc: 'Resources & FAQs for new buyers' },
  { to: '/contact', icon: <Calendar size={18} className="text-gold shrink-0" />, label: 'Schedule a Showing', desc: 'Tour homes on your schedule' },
]

const links = [
  { to: '/', label: 'Home' },
  { to: '/listings', label: 'Search Homes' },
  { to: '/sell', label: 'Sell' },
  { to: '/home-valuation', label: 'Home Value' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
]

function BuyDropdown({ pathname }) {
  const [hovered, setHovered] = useState(false)
  const closeTimer = useRef(null)
  const isActive = pathname === '/buy' || pathname === '/listings'

  const open = () => { clearTimeout(closeTimer.current); setHovered(true) }
  const close = () => { closeTimer.current = setTimeout(() => setHovered(false), 120) }

  return (
    <div className="relative" onMouseEnter={open} onMouseLeave={close}>
      <button className={`flex items-center gap-1 text-base font-medium transition-colors duration-200 ${isActive ? 'text-gold' : 'text-white/90 hover:text-gold'}`}>
        Buy
        <ChevronDown size={16} className={`transition-transform duration-200 ${hovered ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.97 }}
            transition={{ duration: 0.18 }}
            className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-72 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden z-50"
          >
            <div className="p-2">
              <p className="text-sm font-bold text-gray-400 uppercase tracking-widest px-3 pt-2 pb-1">Buying a Home</p>
              {buyDropdownItems.map(item => (
                <Link
                  key={item.label}
                  to={item.to}
                  className="flex items-start gap-3 px-3 py-3 rounded-xl hover:bg-surface transition-colors group"
                >
                  <div className="mt-0.5">{item.icon}</div>
                  <div>
                    <p className="text-base font-semibold text-navy group-hover:text-gold transition-colors">{item.label}</p>
                    <p className="text-sm text-gray-500 leading-snug">{item.desc}</p>
                  </div>
                </Link>
              ))}
            </div>
            <div className="bg-surface px-5 py-3 flex items-center justify-between border-t border-gray-100">
              <span className="text-sm text-gray-500">Ready to start?</span>
              <Link to="/contact" className="text-sm font-bold text-gold hover:underline">Talk to an Agent →</Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [buyMobileOpen, setBuyMobileOpen] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setOpen(false); setBuyMobileOpen(false) }, [pathname])

  const isHome = pathname === '/'
  const transparent = isHome && !scrolled

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${transparent ? 'bg-transparent' : 'bg-navy shadow-lg'}`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-24">
        <Link to="/" className="flex items-center gap-2">
          <span className="font-heading text-3xl font-bold text-gold">Power Team</span>
          <span className="font-heading text-3xl font-light text-white">Realty</span>
        </Link>

        <nav className="hidden lg:flex items-center gap-8">
          <Link to="/" className={`text-base font-medium transition-colors duration-200 ${pathname === '/' ? 'text-gold' : 'text-white/90 hover:text-gold'}`}>Home</Link>
          <Link to="/listings" className={`text-base font-medium transition-colors duration-200 ${pathname === '/listings' ? 'text-gold' : 'text-white/90 hover:text-gold'}`}>Search Homes</Link>
          <BuyDropdown pathname={pathname} />
          {links.filter(l => !['/', '/listings'].includes(l.to)).map(l => (
            <Link
              key={l.to}
              to={l.to}
              className={`text-base font-medium transition-colors duration-200 ${pathname === l.to ? 'text-gold' : 'text-white/90 hover:text-gold'}`}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-4">
          <a href="tel:9288998945" className="flex items-center gap-2 text-gold text-base font-semibold hover:text-white transition-colors">
            <Phone size={20} />
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
            <div className="px-6 py-4 flex flex-col gap-1">
              <Link to="/" className={`text-base font-medium py-2.5 border-b border-white/10 ${pathname === '/' ? 'text-gold' : 'text-white'}`}>Home</Link>
              <Link to="/listings" className={`text-base font-medium py-2.5 border-b border-white/10 ${pathname === '/listings' ? 'text-gold' : 'text-white'}`}>Search Homes</Link>

              {/* Buy mobile accordion */}
              <div className="border-b border-white/10">
                <button
                  onClick={() => setBuyMobileOpen(!buyMobileOpen)}
                  className={`w-full flex items-center justify-between text-base font-medium py-2.5 ${pathname === '/buy' ? 'text-gold' : 'text-white'}`}
                >
                  Buy
                  <ChevronDown size={16} className={`transition-transform ${buyMobileOpen ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {buyMobileOpen && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                      <div className="pl-4 pb-3 flex flex-col gap-1">
                        {buyDropdownItems.map(item => (
                          <Link key={item.label} to={item.to} className="flex items-center gap-3 py-2 text-white/80 hover:text-gold text-sm">
                            {item.icon}
                            <span>{item.label}</span>
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {links.filter(l => !['/', '/listings'].includes(l.to)).map(l => (
                <Link key={l.to} to={l.to} className={`text-base font-medium py-2.5 border-b border-white/10 ${pathname === l.to ? 'text-gold' : 'text-white'}`}>
                  {l.label}
                </Link>
              ))}
              <a href="tel:9288998945" className="flex items-center gap-2 text-gold font-semibold py-2.5 text-lg">
                <Phone size={20} /> 928-899-8945
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
