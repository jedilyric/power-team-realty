import { Link } from 'react-router-dom'
import { Phone, MapPin, Share2, ExternalLink, Mail } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-navy text-white">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-4 gap-10">
          <div className="md:col-span-1">
            <div className="mb-4">
              <span className="font-heading text-2xl font-bold text-gold">Power Team</span>
              <span className="font-heading text-2xl font-light text-white"> Realty</span>
            </div>
            <p className="text-white/60 text-sm leading-relaxed mb-4">
              Top 1% of Arizona Real Estate Agents. Serving buyers and sellers across the Valley and High Country with honesty and expertise.
            </p>
            <div className="flex gap-3">
              <a href="https://www.facebook.com/JamiePowersRealtor" target="_blank" rel="noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-gold transition-colors">
                <ExternalLink size={16} />
              </a>
              <a href="https://www.instagram.com/powerteamazrealestate" target="_blank" rel="noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-gold transition-colors">
                <Share2 size={16} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-gold mb-4 uppercase tracking-wider text-sm">Quick Links</h4>
            <ul className="space-y-2">
              {[['/', 'Home'], ['/listings', 'Search Homes'], ['/buy', 'Buy'], ['/sell', 'Sell'], ['/home-valuation', 'Home Valuation'], ['/about', 'About Us'], ['/contact', 'Contact']].map(([to, label]) => (
                <li key={to}>
                  <Link to={to} className="text-white/60 hover:text-gold transition-colors text-sm">{label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-gold mb-4 uppercase tracking-wider text-sm">Areas We Serve</h4>
            <ul className="space-y-2 text-white/60 text-sm">
              {['Chandler', 'Chino Valley', 'Dewey', 'Gilbert', 'Mayer', 'Mesa', 'Phoenix', 'Prescott', 'Prescott Valley', 'Queen Creek', 'Tempe'].map(city => (
                <li key={city}>{city}</li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-gold mb-4 uppercase tracking-wider text-sm">Contact</h4>
            <div className="space-y-3">
              <a href="tel:9288998945" className="flex items-start gap-3 text-white/60 hover:text-gold transition-colors text-sm">
                <Phone size={16} className="mt-0.5 shrink-0" /> 928-899-8945
              </a>
              <a href="mailto:bryan@powerteamrealty.com" className="flex items-start gap-3 text-white/60 hover:text-gold transition-colors text-sm">
                <Mail size={16} className="mt-0.5 shrink-0" /> bryan@powerteamrealty.com
              </a>
              <div className="flex items-start gap-3 text-white/60 text-sm">
                <MapPin size={16} className="mt-0.5 shrink-0" />
                <span>2133 E Warner Rd Suite 105<br />Tempe, AZ 85284</span>
              </div>
              <p className="text-white/40 text-xs">West USA Realty</p>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/40 text-xs">© {new Date().getFullYear()} Power Team Realty at West USA Realty. All rights reserved.</p>
          <div className="flex items-center gap-6 text-white/40 text-xs">
            <span>🏠 Equal Housing Opportunity</span>
            <span>Arizona License</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
