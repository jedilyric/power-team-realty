import { motion } from 'framer-motion'
import { Phone, Mail, MapPin, Clock, Share2, ExternalLink } from 'lucide-react'
import ContactForm from '../components/ContactForm'

export default function Contact() {
  return (
    <main className="pt-24 lg:pt-44 bg-navy">
      <section className="bg-navy py-20 px-6 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="font-heading text-6xl font-bold text-white mb-4">Get In Touch</h1>
          <p className="text-white/70 text-xl max-w-xl mx-auto">Bryan & Jamie respond within 24 hours. Or call us right now — we'd love to chat.</p>
        </motion.div>
      </section>

      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <h2 className="font-heading text-4xl text-navy font-bold mb-8">Send Us a Message</h2>
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <ContactForm subject="Website Contact Form" />
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="space-y-8">
            <div>
              <h2 className="font-heading text-4xl text-navy font-bold mb-8">Contact Info</h2>
              <div className="space-y-5">
                {[
                  { icon: <Phone className="text-gold" size={22} />, label: 'Phone', value: '928-899-8945', href: 'tel:9288998945' },
                  { icon: <Mail className="text-gold" size={22} />, label: 'Email', value: 'bryan@powerteamrealty.com', href: 'mailto:bryan@powerteamrealty.com' },
                  { icon: <MapPin className="text-gold" size={22} />, label: 'Office', value: '2133 E Warner Rd Suite 105, Tempe, AZ 85284' },
                  { icon: <Clock className="text-gold" size={22} />, label: 'Hours', value: 'Mon–Sat: 8am–7pm | Sun: By Appointment' },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-4 bg-surface rounded-xl p-4">
                    <div className="mt-0.5">{item.icon}</div>
                    <div>
                      <p className="text-base text-gray-400 font-semibold uppercase tracking-wider mb-0.5">{item.label}</p>
                      {item.href
                        ? <a href={item.href} className="text-navy font-semibold hover:text-gold transition-colors">{item.value}</a>
                        : <p className="text-navy font-semibold">{item.value}</p>
                      }
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <p className="text-base font-semibold text-gray-400 uppercase tracking-wider mb-3">Follow Us</p>
              <div className="flex gap-3">
                <a href="https://www.facebook.com/JamiePowersRealtor" target="_blank" rel="noreferrer"
                  className="flex items-center gap-2 bg-navy text-white px-4 py-2.5 rounded-xl text-sm font-medium hover:bg-gold transition-colors">
                  <ExternalLink size={16} /> Facebook
                </a>
                <a href="https://www.instagram.com/powerteamazrealestate" target="_blank" rel="noreferrer"
                  className="flex items-center gap-2 bg-navy text-white px-4 py-2.5 rounded-xl text-sm font-medium hover:bg-gold transition-colors">
                  <Share2 size={16} /> Instagram
                </a>
              </div>
            </div>

            <div className="rounded-2xl overflow-hidden shadow-lg h-64">
              <iframe
                title="Office Location"
                width="100%"
                height="100%"
                loading="lazy"
                src="https://maps.google.com/maps?q=2133+E+Warner+Rd+Suite+105+Tempe+AZ+85284&output=embed"
              />
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  )
}
