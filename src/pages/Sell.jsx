import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Camera, Globe, Users, TrendingUp, DollarSign, CheckCircle, Loader } from 'lucide-react'
import { useState } from 'react'
import { useEmailJS } from '../hooks/useEmailJS'

function ValuationForm() {
  const { send, loading, success, error } = useEmailJS()
  const [step, setStep] = useState(1)
  const [form, setForm] = useState({ address: '', city: '', beds: '', baths: '', sqft: '', name: '', email: '', phone: '' })
  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }))
  const handleSubmit = async e => {
    e.preventDefault()
    await send({ ...form, subject: 'Seller Home Valuation Request', message: `Address: ${form.address}, ${form.city} | ${form.beds}bd/${form.baths}ba | ${form.sqft} sqft` })
  }
  if (success) return (
    <div className="text-center py-8">
      <CheckCircle size={48} className="text-gold mx-auto mb-3" />
      <h3 className="font-heading text-3xl text-navy font-bold mb-2">Request Received!</h3>
      <p className="text-gray-500 text-lg">Bryan & Jamie will send your free home valuation within 24 hours.</p>
    </div>
  )
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex gap-2 mb-6">
        {[1, 2, 3].map(s => (
          <div key={s} className={`h-1.5 flex-1 rounded-full transition-all ${step >= s ? 'bg-gold' : 'bg-gray-200'}`} />
        ))}
      </div>
      {step === 1 && (
        <>
          <h3 className="font-heading text-2xl text-navy font-semibold mb-4">Step 1: Property Address</h3>
          <input name="address" required value={form.address} onChange={handleChange} placeholder="Street Address" className="input-field" />
          <input name="city" required value={form.city} onChange={handleChange} placeholder="City" className="input-field" />
          <button type="button" onClick={() => form.address && form.city && setStep(2)} className="btn-primary w-full">Next →</button>
        </>
      )}
      {step === 2 && (
        <>
          <h3 className="font-heading text-2xl text-navy font-semibold mb-4">Step 2: Home Details</h3>
          <div className="grid grid-cols-3 gap-3">
            <input name="beds" value={form.beds} onChange={handleChange} placeholder="Beds" className="input-field" />
            <input name="baths" value={form.baths} onChange={handleChange} placeholder="Baths" className="input-field" />
            <input name="sqft" value={form.sqft} onChange={handleChange} placeholder="Sq Ft" className="input-field" />
          </div>
          <div className="flex gap-3">
            <button type="button" onClick={() => setStep(1)} className="btn-navy flex-1">← Back</button>
            <button type="button" onClick={() => setStep(3)} className="btn-primary flex-1">Next →</button>
          </div>
        </>
      )}
      {step === 3 && (
        <>
          <h3 className="font-heading text-2xl text-navy font-semibold mb-4">Step 3: Your Contact Info</h3>
          <input name="name" required value={form.name} onChange={handleChange} placeholder="Full Name" className="input-field" />
          <input name="email" type="email" required value={form.email} onChange={handleChange} placeholder="Email Address" className="input-field" />
          <input name="phone" value={form.phone} onChange={handleChange} placeholder="Phone Number" className="input-field" />
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <div className="flex gap-3">
            <button type="button" onClick={() => setStep(2)} className="btn-navy flex-1">← Back</button>
            <button type="submit" disabled={loading} className="btn-primary flex-1 flex items-center justify-center gap-2">
              {loading ? <><Loader size={16} className="animate-spin" /> Sending...</> : 'Get My Value'}
            </button>
          </div>
        </>
      )}
    </form>
  )
}

export default function Sell() {
  return (
    <main className="pt-28 bg-navy">
      <section className="bg-navy py-20 px-6 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="font-heading text-6xl font-bold text-white mb-4">Sell Your Arizona Home</h1>
          <p className="text-white/70 text-xl max-w-xl mx-auto">Get top dollar with The Power Team's proven marketing strategy and expert negotiation.</p>
        </motion.div>
      </section>

      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="section-title">Our Selling Strategy</h2>
            <p className="section-subtitle">We don't just list your home — we launch it with a full marketing campaign.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: <Camera className="text-gold" size={28} />, title: 'Professional Photography', desc: 'HDR photos, drone shots, and 3D virtual tours that make buyers stop scrolling.' },
              { icon: <Globe className="text-gold" size={28} />, title: 'MLS + Online Exposure', desc: 'Listed on MLS, Zillow, Realtor.com, Redfin, and 100+ platforms the same day.' },
              { icon: <Users className="text-gold" size={28} />, title: 'Social Media Campaigns', desc: 'Targeted Facebook & Instagram ads reaching active buyers in your price range.' },
              { icon: <TrendingUp className="text-gold" size={28} />, title: 'Strategic Pricing', desc: 'Data-driven pricing analysis to attract maximum offers without leaving money on the table.' },
              { icon: <DollarSign className="text-gold" size={28} />, title: 'Expert Negotiation', desc: 'We negotiate hard on your behalf to get the best price and terms possible.' },
              { icon: <CheckCircle className="text-gold" size={28} />, title: 'Smooth Closing', desc: 'Full transaction management so you can focus on your next chapter, stress-free.' },
            ].map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} viewport={{ once: true }} className="card p-7">
                <div className="mb-4">{item.icon}</div>
                <h3 className="font-heading text-xl text-navy font-bold mb-2">{item.title}</h3>
                <p className="text-gray-500 text-base leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-6 bg-navy">
        <div className="max-w-4xl mx-auto text-center">
          <span className="inline-block bg-gold/20 border border-gold/40 text-gold text-base font-semibold px-4 py-1.5 rounded-full mb-6">FREE HOME VALUATION</span>
          <h2 className="font-heading text-5xl font-bold text-white mb-4">What's Your Home Worth?</h2>
          <p className="text-white/70 text-xl mb-10">Get a free, data-driven market analysis — no obligation, no pressure.</p>
          <div className="bg-white rounded-2xl p-8"><ValuationForm /></div>
        </div>
      </section>
    </main>
  )
}
