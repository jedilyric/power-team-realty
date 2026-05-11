import { Bed, Bath, Square, MapPin } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function ListingCard({ listing }) {
  return (
    <div className="card group">
      <div className="relative overflow-hidden h-52">
        <img
          src={listing.image}
          alt={listing.address}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute top-3 left-3 bg-gold text-white text-sm font-semibold px-3 py-1 rounded-full">
          {listing.status}
        </div>
        <div className="absolute top-3 right-3 bg-navy/80 text-white text-sm px-2 py-1 rounded-full">
          {listing.daysOnMarket}d on market
        </div>
      </div>
      <div className="p-5">
        <div className="text-3xl font-bold text-navy font-heading mb-1">
          ${listing.price.toLocaleString()}
        </div>
        <div className="flex items-center gap-1 text-gray-500 text-base mb-3">
          <MapPin size={14} className="text-gold" />
          {listing.address}, {listing.city}, {listing.state} {listing.zip}
        </div>
        <div className="flex items-center gap-4 text-base text-gray-600 mb-4">
          <span className="flex items-center gap-1"><Bed size={15} className="text-gold" /> {listing.beds} bd</span>
          <span className="flex items-center gap-1"><Bath size={15} className="text-gold" /> {listing.baths} ba</span>
          <span className="flex items-center gap-1"><Square size={15} className="text-gold" /> {listing.sqft.toLocaleString()} sqft</span>
        </div>
        <Link
          to="/contact"
          className="block text-center bg-navy text-white text-base font-semibold py-2.5 rounded-xl hover:bg-gold transition-colors duration-300"
        >
          Schedule a Showing
        </Link>
      </div>
    </div>
  )
}
