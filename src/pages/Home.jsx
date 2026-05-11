import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'
import { Search, Star, Award, TrendingUp, Heart, Shield, ChevronDown } from 'lucide-react'
import bryanImg from '../assets/bryan-powers.jpg'
import heroImg from '../assets/hero.jpg'
import ListingCard from '../components/ListingCard'
import { mockListings, testimonials } from '../data/mockListings'
import { useEmailJS } from '../hooks/useEmailJS'
import { CheckCircle, Loader } from 'lucide-react'

function AnimatedCounter({ target, suffix = '' }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })

  useEffect(() => {
    if (!inView) return
    let start = 0
    const duration = 2000
    const step = target / (duration / 16)
    const timer = setInterval(() => {
      start += step
      if (start >= target) { setCount(target); clearInterval(timer) }
      else setCount(Math.floor(start))
    }, 16)
    return () => clearInterval(timer)
  }, [inView, target])

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>
}

function TestimonialCarousel() {
  const [current, setCurrent] = useState(0)
  useEffect(() => {
    const t = setInterval(() => setCurrent(c => (c + 1) % testimonials.length), 5000)
    return () => clearInterval(t)
  }, [])
  const t = testimonials[current]
  return (
    <div className="max-w-3xl mx-auto text-center">
      <div className="flex justify-center gap-1 mb-6">
        {Array(t.rating).fill(0).map((_, i) => <Star key={i} size={20} className="fill-gold text-gold" />)}
      </div>
      <motion.p key={current} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-gray-600 text-lg leading-relaxed mb-6 italic">
        "{t.text}"
      </motion.p>
      <p className="font-semibold text-navy">{t.name}</p>
      <p className="text-gray-400 text-sm">{t.city}</p>
      <div className="flex justify-center gap-2 mt-6">
        {testimonials.map((_, i) => (
          <button key={i} onClick={() => setCurrent(i)}
            className={`w-2 h-2 rounded-full transition-all ${i === current ? 'bg-gold w-6' : 'bg-gray-300'}`} />
        ))}
      </div>
    </div>
  )
}

function ValuationCTA() {
  const { send, loading, success, error } = useEmailJS()
  const [form, setForm] = useState({ name: '', email: '', phone: '', address: '' })
  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }))
  const handleSubmit = async e => {
    e.preventDefault()
    await send({ ...form, subject: 'Home Valuation Request', message: `Address: ${form.address}` })
  }
  if (success) {
    return (
      <div className="text-center py-8">
        <CheckCircle size={48} className="text-gold mx-auto mb-3" />
        <h3 className="font-heading text-xl text-navy font-bold mb-2">We'll be in touch!</h3>
        <p className="text-gray-500">Check your email for confirmation. Bryan & Jamie will reach out within 24 hours.</p>
      </div>
    )
  }
  return (
    <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-4">
      <input name="name" required value={form.name} onChange={handleChange} placeholder="Your Name" className="input-field" />
      <input name="email" type="email" required value={form.email} onChange={handleChange} placeholder="Email Address" className="input-field" />
      <input name="phone" value={form.phone} onChange={handleChange} placeholder="Phone Number" className="input-field" />
      <input name="address" required value={form.address} onChange={handleChange} placeholder="Property Address" className="input-field" />
      {error && <p className="text-red-500 text-sm col-span-2">{error}</p>}
      <button type="submit" disabled={loading} className="btn-primary md:col-span-2 flex items-center justify-center gap-2">
        {loading ? <><Loader size={18} className="animate-spin" /> Sending...</> : 'Get My Free Home Value'}
      </button>
    </form>
  )
}

export default function Home() {
  const [searchCity, setSearchCity] = useState('')

  return (
    <main>
      {/* HERO */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={heroImg}
            alt="Arizona home"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-navy/70 via-navy/50 to-navy/80" />
        </div>
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto pt-36">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <span className="inline-block bg-gold text-navy text-sm font-bold px-6 py-2 rounded-full mb-6 tracking-wider shadow-lg">
              TOP 1% OF ARIZONA REAL ESTATE AGENTS
            </span>
            <h1 className="font-heading text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Find Your Place<br />in <span className="text-gold">Arizona</span>
            </h1>
            <p className="text-white/80 text-xl mb-10 max-w-2xl mx-auto">
              Trusted by hundreds of buyers and sellers across the Valley and High Country. Bryan & Jamie Powers — Your Arizona Home Experts.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/listings" className="btn-primary text-lg px-10 py-4">Search Homes</Link>
              <Link to="/home-valuation" className="btn-outline text-lg px-10 py-4">Get a Free Home Value</Link>
            </div>
          </motion.div>
        </div>
        <a href="#search" className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/60 hover:text-white animate-bounce">
          <ChevronDown size={32} />
        </a>
      </section>

      {/* SEARCH */}
      <section id="search" className="bg-navy py-8 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl p-4 shadow-2xl flex flex-col md:flex-row gap-3">
            <input
              value={searchCity}
              onChange={e => setSearchCity(e.target.value)}
              placeholder="City, ZIP, or neighborhood..."
              className="flex-1 input-field"
            />
            <select className="input-field md:w-40">
              <option>Any Price</option>
              <option>Under $300k</option>
              <option>$300k–$500k</option>
              <option>$500k–$750k</option>
              <option>$750k+</option>
            </select>
            <select className="input-field md:w-36">
              <option>Any Beds</option>
              <option>1+ Beds</option>
              <option>2+ Beds</option>
              <option>3+ Beds</option>
              <option>4+ Beds</option>
            </select>
            <Link to="/listings" className="btn-primary flex items-center gap-2 whitespace-nowrap">
              <Search size={18} /> Search
            </Link>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="bg-surface py-16 px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { value: 500, suffix: '+', label: 'Families Served' },
            { value: 1, suffix: '%', label: 'Top AZ Agents' },
            { value: 200, suffix: 'M+', label: 'In Sales' },
            { value: 15, suffix: '+', label: 'Years Experience' },
          ].map((stat, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} viewport={{ once: true }}>
              <div className="font-heading text-4xl md:text-5xl font-bold text-gold mb-2">
                <AnimatedCounter target={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-navy font-semibold">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FEATURED LISTINGS */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="section-title">Featured Listings</h2>
            <p className="section-subtitle">Handpicked properties across Arizona's most sought-after communities</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {mockListings.map((listing, i) => (
              <motion.div key={listing.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} viewport={{ once: true }}>
                <ListingCard listing={listing} />
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link to="/listings" className="btn-navy px-12">View All Listings</Link>
          </div>
        </div>
      </section>

      {/* MEET THE TEAM */}
      <section className="py-20 px-6 bg-surface">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="section-title">Meet Bryan & Jamie</h2>
            <p className="section-subtitle">Two dedicated professionals with one shared mission — making your real estate dreams a reality.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-10">
            {[
              {
                name: 'Bryan Powers',
                role: 'Lead Agent & Co-Founder',
                image: bryanImg,
                bio: "Bryan brings over 15 years of Arizona real estate expertise, specializing in investment properties and luxury homes across the Valley and High Country. As a multi-million dollar producer and Diamond Award recipient, he's known for sharp negotiation and relentless advocacy for his clients.",
              },
              {
                name: 'Jamie Powers',
                role: 'Lead Agent & Co-Founder',
                image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80',
                bio: "Jamie's warmth and deep market knowledge have made her a favorite among first-time buyers and growing families. Her client-first approach, paired with a sharp eye for value, ensures every buyer and seller feels guided, heard, and confident throughout the entire process.",
              },
            ].map((agent, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: i === 0 ? -30 : 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="card p-8 flex flex-col md:flex-row gap-6 items-center md:items-start">
                <img src={agent.image} alt={agent.name} className="w-28 h-28 rounded-full object-cover border-4 border-gold shrink-0" />
                <div>
                  <h3 className="font-heading text-2xl text-navy font-bold mb-1">{agent.name}</h3>
                  <p className="text-gold font-medium text-sm mb-3 tracking-wide">{agent.role}</p>
                  <p className="text-gray-600 leading-relaxed text-sm">{agent.bio}</p>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link to="/about" className="btn-navy">Learn More About Us</Link>
          </div>
        </div>
      </section>

      {/* AREAS WE SERVE */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="section-title">Areas We Serve</h2>
          <p className="section-subtitle">From the Valley's vibrant cities to Arizona's breathtaking high country</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {['Chandler', 'Chino Valley', 'Dewey', 'Gilbert', 'Mayer', 'Mesa', 'Phoenix', 'Prescott', 'Prescott Valley', 'Queen Creek', 'Tempe', 'Scottsdale'].map((city, i) => (
              <motion.div key={city} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.05 }} viewport={{ once: true }}>
                <Link to="/listings" className="block bg-white border border-surface hover:border-gold text-navy font-semibold py-4 px-3 rounded-xl text-sm text-center transition-all hover:shadow-md hover:text-gold">
                  {city}
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* HOME VALUATION CTA */}
      <section className="py-20 px-6 bg-navy">
        <div className="max-w-4xl mx-auto text-center">
          <span className="inline-block bg-gold/20 border border-gold/40 text-gold text-sm font-semibold px-4 py-1.5 rounded-full mb-6">FREE HOME VALUATION</span>
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-white mb-4">What's Your Home Worth?</h2>
          <p className="text-white/70 text-lg mb-10">Get a free, no-obligation market analysis from Arizona's top-rated team.</p>
          <div className="bg-white rounded-2xl p-8">
            <ValuationCTA />
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-20 px-6 bg-surface">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="section-title">What Our Clients Say</h2>
          <p className="section-subtitle">Real stories from real Arizona families</p>
          <TestimonialCarousel />
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="section-title">Why Choose Power Team Realty</h2>
          <p className="section-subtitle">We combine local expertise with a personal touch that big brokerages simply can't match.</p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-4">
            {[
              { icon: <Award className="text-gold" size={32} />, title: 'Local Expertise', desc: 'Top 1% of AZ agents with deep knowledge of every market from Phoenix to Prescott.' },
              { icon: <Shield className="text-gold" size={32} />, title: 'Honest Communication', desc: 'We tell you what you need to hear, not just what you want to hear. Always transparent.' },
              { icon: <TrendingUp className="text-gold" size={32} />, title: 'Top Negotiators', desc: '$200M+ in closed sales backed by proven negotiation strategies that win for our clients.' },
              { icon: <Heart className="text-gold" size={32} />, title: 'Full-Service Support', desc: 'From first call to closing day and beyond — we\'re with you every step of the way.' },
            ].map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} viewport={{ once: true }} className="card p-8 text-center">
                <div className="flex justify-center mb-4">{item.icon}</div>
                <h3 className="font-heading text-xl text-navy font-bold mb-3">{item.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-20 px-6 bg-gold">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-heading text-4xl font-bold text-white mb-4">Ready to Make a Move?</h2>
          <p className="text-white/90 text-lg mb-8">Whether you're buying, selling, or just exploring — we'd love to hear from you.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact" className="bg-white text-gold font-bold px-10 py-4 rounded-full hover:bg-navy hover:text-white transition-all duration-300">Contact Us Today</Link>
            <a href="tel:9288998945" className="border-2 border-white text-white font-bold px-10 py-4 rounded-full hover:bg-white hover:text-gold transition-all duration-300">Call 928-899-8945</a>
          </div>
        </div>
      </section>
    </main>
  )
}
