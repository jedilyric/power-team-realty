import { motion } from 'framer-motion'
import { useState } from 'react'
import { useEmailJS } from '../hooks/useEmailJS'
import { CheckCircle, Loader } from 'lucide-react'

export default function HomeValuation() {
  const { send, loading, success, error } = useEmailJS()
  const [step, setStep] = useState(1)
  const [form, setForm] = useState({ address: '', city: '', state: 'AZ', zip: '', beds: '', baths: '', sqft: '', yearBuilt: '', condition: 'Good', name: '', email: '', phone: '' })
  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }))
  const handleSubmit = async e => {
    e.preventDefault()
    await send({ ...form, subject: 'Free Home Valuation Request', message: `${form.address}, ${form.city}, ${form.state} ${form.zip} | ${form.beds}bd/${form.baths}ba | ${form.sqft} sqft | Built ${form.yearBuilt} | Condition: ${form.condition}` })
  }

  if (success) return (
    <main className="pt-36 min-h-screen flex items-center justify-center bg-cream px-6">
      <div className="text-center max-w-md">
        <CheckCircle size={72} className="text-gold mx-auto mb-6" />
        <h2 className="font-heading text-4xl text-navy font-bold mb-4">You're All Set!</h2>
        <p className="text-gray-500 text-lg leading-relaxed">Bryan & Jamie will review your home details and send a comprehensive market analysis within 24 hours. Check your email for confirmation.</p>
      </div>
    </main>
  )

  return (
    <main className="pt-36">
      <section className="bg-navy py-20 px-6 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="font-heading text-5xl font-bold text-white mb-4">Free Home Valuation</h1>
          <p className="text-white/70 text-lg max-w-xl mx-auto">Find out what your Arizona home is worth in today's market — free, fast, and no obligation.</p>
        </motion.div>
      </section>

      <section className="py-20 px-6">
        <div className="max-w-2xl mx-auto">
          <div className="flex gap-2 mb-10">
            {[1, 2, 3].map(s => (
              <div key={s} className="flex-1">
                <div className={`h-2 rounded-full transition-all ${step >= s ? 'bg-gold' : 'bg-gray-200'}`} />
                <p className={`text-sm mt-1 font-medium ${step >= s ? 'text-gold' : 'text-gray-400'}`}>
                  {['Property Address', 'Home Details', 'Your Info'][s - 1]}
                </p>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-2xl p-10 shadow-xl">
            <form onSubmit={handleSubmit} className="space-y-5">
              {step === 1 && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                  <h2 className="font-heading text-2xl text-navy font-bold mb-6">Where is your property?</h2>
                  <input name="address" required value={form.address} onChange={handleChange} placeholder="Street Address" className="input-field" />
                  <div className="grid grid-cols-2 gap-4">
                    <input name="city" required value={form.city} onChange={handleChange} placeholder="City" className="input-field" />
                    <input name="zip" value={form.zip} onChange={handleChange} placeholder="ZIP Code" className="input-field" />
                  </div>
                  <button type="button" onClick={() => form.address && form.city && setStep(2)} className="btn-primary w-full py-4">Continue →</button>
                </motion.div>
              )}
              {step === 2 && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                  <h2 className="font-heading text-2xl text-navy font-bold mb-6">Tell us about your home</h2>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Bedrooms</label>
                      <input name="beds" value={form.beds} onChange={handleChange} placeholder="3" className="input-field" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Bathrooms</label>
                      <input name="baths" value={form.baths} onChange={handleChange} placeholder="2" className="input-field" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Sq. Footage</label>
                      <input name="sqft" value={form.sqft} onChange={handleChange} placeholder="1800" className="input-field" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Year Built</label>
                      <input name="yearBuilt" value={form.yearBuilt} onChange={handleChange} placeholder="2005" className="input-field" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Condition</label>
                      <select name="condition" value={form.condition} onChange={handleChange} className="input-field">
                        <option>Excellent</option>
                        <option>Good</option>
                        <option>Fair</option>
                        <option>Needs Work</option>
                      </select>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <button type="button" onClick={() => setStep(1)} className="btn-navy flex-1 py-3">← Back</button>
                    <button type="button" onClick={() => setStep(3)} className="btn-primary flex-1 py-3">Continue →</button>
                  </div>
                </motion.div>
              )}
              {step === 3 && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                  <h2 className="font-heading text-2xl text-navy font-bold mb-6">Where should we send your report?</h2>
                  <input name="name" required value={form.name} onChange={handleChange} placeholder="Full Name" className="input-field" />
                  <input name="email" type="email" required value={form.email} onChange={handleChange} placeholder="Email Address" className="input-field" />
                  <input name="phone" value={form.phone} onChange={handleChange} placeholder="Phone Number (optional)" className="input-field" />
                  {error && <p className="text-red-500 text-sm">{error}</p>}
                  <p className="text-sm text-gray-400">By submitting, you agree to be contacted by Power Team Realty. We respect your privacy.</p>
                  <div className="flex gap-3">
                    <button type="button" onClick={() => setStep(2)} className="btn-navy flex-1 py-3">← Back</button>
                    <button type="submit" disabled={loading} className="btn-primary flex-1 py-3 flex items-center justify-center gap-2">
                      {loading ? <><Loader size={16} className="animate-spin" /> Sending...</> : 'Get My Free Report'}
                    </button>
                  </div>
                </motion.div>
              )}
            </form>
          </div>
        </div>
      </section>
    </main>
  )
}
