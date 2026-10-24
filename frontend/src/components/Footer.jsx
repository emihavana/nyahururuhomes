import { Link } from 'react-router-dom'
import { Facebook, Instagram, Mail, MapPin, Phone, Send } from 'lucide-react'
import { agency } from '../config'

export default function Footer() {
  const submit = (event) => { event.preventDefault(); event.currentTarget.reset(); window.alert('Thanks for subscribing! We will be in touch with local home updates.') }
  return (
    <footer className="bg-[#112d1c] text-white">
      <div className="container-page grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div className="sm:col-span-2 lg:col-span-1">
          <Link to="/" className="font-heading text-xl font-extrabold">{agency.name}</Link>
          <p className="mt-4 max-w-xs text-sm leading-6 text-green-100/70">Thoughtful local guidance to help you find a place that feels like home.</p>
          <div className="mt-5 flex gap-3">
            <a aria-label="Instagram" href={agency.social.instagram} className="rounded-full bg-white/10 p-2.5 hover:bg-white/20"><Instagram size={17} /></a>
            <a aria-label="Facebook" href={agency.social.facebook} className="rounded-full bg-white/10 p-2.5 hover:bg-white/20"><Facebook size={17} /></a>
          </div>
        </div>
        <div><h3 className="font-heading font-bold">Explore</h3><div className="mt-4 grid gap-3 text-sm text-green-100/75"><Link to="/properties" className="hover:text-white">Available homes</Link><Link to="/about" className="hover:text-white">About us</Link><Link to="/contact" className="hover:text-white">Contact</Link></div></div>
        <div><h3 className="font-heading font-bold">Get in touch</h3><div className="mt-4 grid gap-3 text-sm text-green-100/75"><a className="flex items-center gap-2" href={`tel:${agency.phoneLink}`}><Phone size={15} />{agency.phone}</a><a className="flex items-center gap-2" href={`mailto:${agency.email}`}><Mail size={15} />{agency.email}</a><span className="flex items-start gap-2"><MapPin size={15} className="mt-0.5 shrink-0" />{agency.address}</span></div></div>
        <div><h3 className="font-heading font-bold">Local home notes</h3><p className="mt-3 text-sm leading-6 text-green-100/70">New listings and useful renting tips, occasionally.</p><form onSubmit={submit} className="mt-4 flex rounded-full bg-white p-1.5"><label htmlFor="newsletter-email" className="sr-only">Email address</label><input id="newsletter-email" type="email" required placeholder="Your email address" className="min-w-0 flex-1 bg-transparent px-3 text-sm text-ink outline-none" /><button aria-label="Subscribe to newsletter" className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-amber text-white hover:bg-amber-700"><Send size={15} /></button></form></div>
      </div>
      <div className="border-t border-white/10"><div className="container-page flex flex-col justify-between gap-2 py-5 text-xs text-green-100/60 sm:flex-row"><span>© {new Date().getFullYear()} {agency.name}. All rights reserved.</span><span>Locally rooted in Nyahururu, Kenya</span></div></div>
    </footer>
  )
}
