import { useState, useEffect } from 'react'
import { Phone, ArrowUp } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export default function FloatingActions() {
  const [showTop, setShowTop] = useState(false)

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 400)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
      <AnimatePresence>
        {showTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="w-12 h-12 bg-navy text-white rounded-full shadow-lg flex items-center justify-center hover:bg-gold transition-colors"
          >
            <ArrowUp size={20} />
          </motion.button>
        )}
      </AnimatePresence>
      <motion.a
        href="tel:9288998945"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.5 }}
        className="w-14 h-14 bg-gold text-white rounded-full shadow-xl flex items-center justify-center hover:bg-opacity-90 transition-all hover:scale-110"
        aria-label="Call us"
      >
        <Phone size={22} />
      </motion.a>
    </div>
  )
}
