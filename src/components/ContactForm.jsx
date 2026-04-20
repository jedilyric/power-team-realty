import { useState } from 'react'
import { useEmailJS } from '../hooks/useEmailJS'
import { CheckCircle, Loader } from 'lucide-react'

export default function ContactForm({ subject = 'General Inquiry', showType = true }) {
  const { send, loading, success, error } = useEmailJS()
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '', type: 'Buyer' })

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const handleSubmit = async e => {
    e.preventDefault()
    await send({ ...form, subject })
  }

  if (success) {
    return (
      <div className="text-center py-12">
        <CheckCircle size={56} className="text-gold mx-auto mb-4" />
        <h3 className="font-heading text-2xl text-navy font-bold mb-2">Message Sent!</h3>
        <p className="text-gray-500">Bryan & Jamie will reach out within 24 hours. Check your email for a confirmation.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-body mb-1">Full Name *</label>
          <input name="name" required value={form.name} onChange={handleChange} placeholder="John Smith" className="input-field" />
        </div>
        <div>
          <label className="block text-sm font-medium text-body mb-1">Email *</label>
          <input name="email" type="email" required value={form.email} onChange={handleChange} placeholder="john@email.com" className="input-field" />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-body mb-1">Phone</label>
        <input name="phone" value={form.phone} onChange={handleChange} placeholder="(555) 000-0000" className="input-field" />
      </div>
      {showType && (
        <div>
          <label className="block text-sm font-medium text-body mb-1">I am a...</label>
          <select name="type" value={form.type} onChange={handleChange} className="input-field">
            <option>Buyer</option>
            <option>Seller</option>
            <option>Buyer & Seller</option>
            <option>Investor</option>
          </select>
        </div>
      )}
      <div>
        <label className="block text-sm font-medium text-body mb-1">Message</label>
        <textarea name="message" rows={4} value={form.message} onChange={handleChange} placeholder="Tell us how we can help..." className="input-field resize-none" />
      </div>
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <button type="submit" disabled={loading} className="btn-primary w-full flex items-center justify-center gap-2">
        {loading ? <><Loader size={18} className="animate-spin" /> Sending...</> : 'Send Message'}
      </button>
    </form>
  )
}
