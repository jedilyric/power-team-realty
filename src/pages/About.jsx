import { motion } from 'framer-motion'
import { Award, Star, Users, TrendingUp } from 'lucide-react'
import { Link } from 'react-router-dom'
import bryanImg from '../assets/bryan-powers.jpg'

export default function About() {
  return (
    <main className="pt-24 lg:pt-44">
      <section className="bg-navy py-20 px-6 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="font-heading text-5xl font-bold text-white mb-4">Meet The Power Team</h1>
          <p className="text-white/70 text-lg max-w-xl mx-auto">Two real estate professionals. One shared commitment to putting clients first.</p>
        </motion.div>
      </section>

      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <img src={bryanImg} alt="Bryan Powers" className="rounded-2xl shadow-xl w-full object-cover h-96 object-[center_55%]" />
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <span className="text-gold font-semibold tracking-wider text-base uppercase">Lead Agent & Co-Founder</span>
            <h2 className="font-heading text-4xl text-navy font-bold mt-2 mb-4">Bryan Powers</h2>
            <p className="text-gray-600 leading-relaxed mb-4">Bryan has spent over 15 years mastering Arizona's diverse real estate markets — from the high-energy Phoenix metro to the serene high country communities of Prescott and Chino Valley. His background in investment properties gives clients a strategic edge whether they're buying their first home or expanding a portfolio.</p>
            <p className="text-gray-600 leading-relaxed mb-6">A multi-million dollar producer and Diamond Award recipient, Bryan's reputation is built on relentless dedication and a negotiation style that consistently delivers results above and beyond expectations.</p>
            <div className="flex flex-wrap gap-3">
              {['Diamond Award Recipient', 'Multi-Million Dollar Producer', 'Top 1% Arizona Agents'].map(badge => (
                <span key={badge} className="bg-gold/10 border border-gold/30 text-gold text-sm font-semibold px-3 py-1.5 rounded-full">{badge}</span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-20 px-6 bg-surface">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="lg:order-2">
            <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&q=80" alt="Jamie Powers" className="rounded-2xl shadow-xl w-full object-cover h-96 object-[center_55%]" />
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="lg:order-1">
            <span className="text-gold font-semibold tracking-wider text-base uppercase">Lead Agent & Co-Founder</span>
            <h2 className="font-heading text-4xl text-navy font-bold mt-2 mb-4">Jamie Powers</h2>
            <p className="text-gray-600 leading-relaxed mb-4">Jamie is the heart of The Power Team. Her genuine warmth, combined with deep market expertise, creates an experience that clients describe as working with a trusted friend rather than just an agent. She specializes in guiding first-time buyers and families through what can otherwise be an overwhelming process.</p>
            <p className="text-gray-600 leading-relaxed mb-6">Jamie's commitment to honest communication and personalized service has earned her a loyal following of repeat clients and referrals across the entire Valley and High Country.</p>
            <div className="flex flex-wrap gap-3">
              {['Client-First Philosophy', 'First-Time Buyer Specialist', 'Arizona Market Expert'].map(badge => (
                <span key={badge} className="bg-gold/10 border border-gold/30 text-gold text-sm font-semibold px-3 py-1.5 rounded-full">{badge}</span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="section-title">Awards & Achievements</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
            {[
              { icon: <Award size={36} className="text-gold" />, title: 'Diamond Award', desc: 'West USA Realty\'s highest sales honor' },
              { icon: <Star size={36} className="text-gold" />, title: 'Top 1%', desc: 'Of all Arizona Real Estate Agents' },
              { icon: <TrendingUp size={36} className="text-gold" />, title: '$200M+', desc: 'In total career sales volume' },
              { icon: <Users size={36} className="text-gold" />, title: '500+ Families', desc: 'Helped find their Arizona home' },
            ].map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} viewport={{ once: true }} className="card p-8 text-center">
                <div className="flex justify-center mb-4">{item.icon}</div>
                <h3 className="font-heading text-xl text-navy font-bold mb-2">{item.title}</h3>
                <p className="text-gray-500 text-base">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-6 bg-navy text-center">
        <h2 className="font-heading text-4xl font-bold text-white mb-4">Ready to Work Together?</h2>
        <p className="text-white/70 text-lg mb-8">Let's find or sell your Arizona home the right way.</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/contact" className="btn-primary px-10 py-4">Contact Us</Link>
          <Link to="/listings" className="btn-outline px-10 py-4">Search Homes</Link>
        </div>
      </section>
    </main>
  )
}
