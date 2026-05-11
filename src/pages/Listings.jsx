import { useState } from 'react'
import { motion } from 'framer-motion'
import { SlidersHorizontal } from 'lucide-react'
import ListingCard from '../components/ListingCard'
import { mockListings } from '../data/mockListings'

const cities = ['All', 'Phoenix', 'Chandler', 'Gilbert', 'Tempe', 'Prescott', 'Mesa', 'Scottsdale']

export default function Listings() {
  const [city, setCity] = useState('All')
  const [maxPrice, setMaxPrice] = useState('')
  const [minBeds, setMinBeds] = useState('')

  const filtered = mockListings.filter(l => {
    if (city !== 'All' && l.city !== city) return false
    if (maxPrice && l.price > parseInt(maxPrice)) return false
    if (minBeds && l.beds < parseInt(minBeds)) return false
    return true
  })

  return (
    <main className="pt-28 bg-navy">
      <section className="bg-navy py-16 px-6 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="font-heading text-6xl font-bold text-white mb-4">Search Arizona Homes</h1>
          <p className="text-white/70 text-xl">Browse active listings across the Valley and High Country</p>
        </motion.div>
      </section>

      <section className="py-10 px-6 bg-surface border-b border-gray-200">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2 text-navy font-semibold">
              <SlidersHorizontal size={18} className="text-gold" /> Filters:
            </div>
            <select value={city} onChange={e => setCity(e.target.value)} className="input-field w-auto">
              {cities.map(c => <option key={c}>{c}</option>)}
            </select>
            <select value={maxPrice} onChange={e => setMaxPrice(e.target.value)} className="input-field w-auto">
              <option value="">Any Price</option>
              <option value="300000">Under $300k</option>
              <option value="500000">Under $500k</option>
              <option value="750000">Under $750k</option>
              <option value="1000000">Under $1M</option>
            </select>
            <select value={minBeds} onChange={e => setMinBeds(e.target.value)} className="input-field w-auto">
              <option value="">Any Beds</option>
              <option value="2">2+ Beds</option>
              <option value="3">3+ Beds</option>
              <option value="4">4+ Beds</option>
              <option value="5">5+ Beds</option>
            </select>
            <span className="text-gray-500 text-base ml-auto">{filtered.length} homes found</span>
          </div>
        </div>
      </section>

      <section className="py-12 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          {filtered.length === 0 ? (
            <div className="text-center py-20 text-gray-400">
              <p className="text-2xl">No listings match your filters.</p>
              <button onClick={() => { setCity('All'); setMaxPrice(''); setMinBeds('') }} className="btn-primary mt-4">Clear Filters</button>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filtered.map((listing, i) => (
                <motion.div key={listing.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}>
                  <ListingCard listing={listing} />
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="py-16 px-6 bg-navy text-center">
        <h2 className="font-heading text-4xl font-bold text-white mb-4">Don't See What You're Looking For?</h2>
        <p className="text-white/70 text-xl mb-8 max-w-xl mx-auto">Set up instant listing alerts and be the first to know when your dream home hits the market.</p>
        <a href="/contact" className="btn-primary px-12 py-4 text-lg">Get Listing Alerts</a>
      </section>
    </main>
  )
}
