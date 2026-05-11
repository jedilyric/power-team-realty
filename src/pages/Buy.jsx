import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Search, FileText, Home, Key, CheckCircle, ChevronDown } from 'lucide-react'
import { useState } from 'react'

const faqs = [
  { q: 'How much do I need for a down payment?', a: 'Down payment requirements vary by loan type. FHA loans require as little as 3.5%, while conventional loans may require 5–20%. VA loans for veterans may require 0% down. We can connect you with trusted lenders.' },
  { q: 'How long does the homebuying process take?', a: 'On average, the process takes 30–60 days from accepted offer to closing. Finding the right home can take anywhere from days to months depending on your criteria and the market.' },
  { q: 'Do I need to be pre-approved before looking at homes?', a: 'We highly recommend getting pre-approved first. It strengthens your offer significantly and gives you a clear budget. We can refer you to trusted local lenders.' },
  { q: 'What are closing costs?', a: 'Closing costs typically range from 2–5% of the home purchase price and include lender fees, title insurance, escrow fees, and more. We\'ll walk you through every cost before you close.' },
  { q: 'Do buyers pay agent commissions?', a: 'As a buyer, our services are typically paid by the seller. We represent YOUR best interests at no cost to you in most transactions.' },
]

function FAQ({ q, a }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden">
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between p-5 text-left bg-white hover:bg-surface transition-colors">
        <span className="font-semibold text-navy">{q}</span>
        <ChevronDown size={18} className={`text-gold transition-transform shrink-0 ml-4 ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && <div className="px-5 pb-5 text-gray-600 text-base leading-relaxed bg-white">{a}</div>}
    </div>
  )
}

export default function Buy() {
  return (
    <main className="pt-28 bg-navy">
      <section className="bg-navy py-20 px-6 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="font-heading text-6xl font-bold text-white mb-4">Buy a Home in Arizona</h1>
          <p className="text-white/70 text-xl max-w-xl mx-auto">We make the homebuying journey clear, confident, and exciting from start to finish.</p>
        </motion.div>
      </section>

      <section className="py-20 px-6 bg-white">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="section-title">The Buyer's Journey</h2>
          <p className="section-subtitle">A simple, step-by-step path to your new Arizona home</p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-4">
            {[
              { icon: <FileText className="text-gold" size={32} />, step: '01', title: 'Get Pre-Approved', desc: 'Know your budget before you shop. We\'ll connect you with trusted Arizona lenders.' },
              { icon: <Search className="text-gold" size={32} />, step: '02', title: 'Search & Tour', desc: 'We curate homes that match your needs and schedule private showings on your timeline.' },
              { icon: <CheckCircle className="text-gold" size={32} />, step: '03', title: 'Make an Offer', desc: 'We craft competitive offers backed by deep market data and sharp negotiation.' },
              { icon: <Key className="text-gold" size={32} />, step: '04', title: 'Close & Move In', desc: 'We guide you through inspections, paperwork, and closing day. Then hand you the keys!' },
            ].map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} viewport={{ once: true }} className="card p-8 text-center relative">
                <div className="text-5xl font-bold text-surface mb-4 font-heading absolute top-4 right-4 leading-none">{item.step}</div>
                <div className="flex justify-center mb-4 relative z-10">{item.icon}</div>
                <h3 className="font-heading text-2xl text-navy font-bold mb-3 relative z-10">{item.title}</h3>
                <p className="text-gray-500 text-base leading-relaxed relative z-10">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-6 bg-surface">
        <div className="max-w-3xl mx-auto">
          <h2 className="section-title text-center">Frequently Asked Questions</h2>
          <p className="section-subtitle text-center">Everything you need to know about buying in Arizona</p>
          <div className="space-y-3">
            {faqs.map((faq, i) => <FAQ key={i} {...faq} />)}
          </div>
        </div>
      </section>

      <section className="py-20 px-6 bg-navy text-center">
        <h2 className="font-heading text-5xl font-bold text-white mb-4">Start Your Search Today</h2>
        <p className="text-white/70 text-xl mb-8">Browse active listings or contact us to get started with a personalized home search.</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/listings" className="btn-primary px-10 py-4">Browse Homes</Link>
          <Link to="/contact" className="btn-outline px-10 py-4">Talk to an Agent</Link>
        </div>
      </section>
    </main>
  )
}
