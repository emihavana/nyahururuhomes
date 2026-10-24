import { useState } from 'react'
import { Heart, MapPin, BedDouble, Bath, ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { propertyImageUrl } from '../lib/api'

const kes = (value) => new Intl.NumberFormat('en-KE').format(value)

export default function PropertyCard({ property, favorite = false, onToggleFavorite }) {
  const [loaded, setLoaded] = useState(false)
  return (
    <motion.article layout whileHover={{ y: -4 }} className="group overflow-hidden rounded-2xl border border-stone-100 bg-white shadow-sm transition-shadow hover:shadow-soft">
      <div className="relative aspect-[1.45] overflow-hidden bg-stone-200">
        {!loaded && <div className="absolute inset-0 animate-pulse bg-stone-200" />}
        <img src={propertyImageUrl(property.image)} alt={property.title} loading="lazy" onLoad={() => setLoaded(true)} className={`h-full w-full object-cover transition duration-500 group-hover:scale-105 ${loaded ? 'opacity-100' : 'opacity-0'}`} />
        <span className={`absolute left-4 top-4 rounded-full px-3 py-1 text-xs font-bold ${property.status === 'Available' ? 'bg-white text-forest' : 'bg-stone-800 text-white'}`}>{property.status}</span>
        <button aria-label={favorite ? `Remove ${property.title} from saved homes` : `Save ${property.title}`} aria-pressed={favorite} onClick={() => onToggleFavorite?.(property.id)} className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full bg-white/95 text-stone-600 shadow transition hover:text-rose-600"><Heart size={17} fill={favorite ? 'currentColor' : 'none'} className={favorite ? 'text-rose-600' : ''} /></button>
      </div>
      <div className="p-5">
        <div className="flex items-start justify-between gap-3"><div><h3 className="font-heading text-base font-bold text-ink">{property.title}</h3><p className="mt-1.5 flex items-center gap-1 text-sm text-stone-500"><MapPin size={14} />{property.location}, Nyahururu</p></div></div>
        <div className="mt-4 flex items-center gap-4 border-y border-stone-100 py-3 text-xs font-medium text-stone-600"><span className="flex items-center gap-1.5"><BedDouble size={15} />{property.bedrooms || 'Studio'} bed</span><span className="flex items-center gap-1.5"><Bath size={15} />{property.bathrooms} bath</span></div>
        <div className="flex items-center justify-between pt-4"><p className="font-heading text-lg font-extrabold text-forest">KES {kes(property.price)}<span className="font-sans text-xs font-medium text-stone-500"> / month</span></p><Link to={`/properties?property=${property.id}`} className="inline-flex items-center gap-1 text-sm font-bold text-forest hover:text-amber">View details <ArrowUpRight size={15} /></Link></div>
      </div>
    </motion.article>
  )
}
