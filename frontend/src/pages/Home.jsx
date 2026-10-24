import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowRight, BadgeCheck, Building2, Clock3, Handshake, Search, ShieldCheck, Users, Wallet } from 'lucide-react'
import { locations, propertyTypes } from '../config'
import PageMeta from '../components/PageMeta'
import PageTransition from '../components/PageTransition'
import SectionHeading from '../components/SectionHeading'
import Button from '../components/Button'
import PropertyCard from '../components/PropertyCard'
import TestimonialCard from '../components/TestimonialCard'
import useFavorites from '../hooks/useFavorites'
import useProperties from '../hooks/useProperties'

const reviews = [
  { quote: 'The team really listened to what we needed and found us a lovely home close to school. The whole process felt clear and easy.', name: 'Wanjiku M.', role: 'Tenant in Ndururumo', image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80' },
  { quote: 'I was moving to Nyahururu for work and was nervous doing it from a distance. They arranged a viewing and answered all my questions.', name: 'Brian K.', role: 'Tenant in Githunguri', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80' },
  { quote: 'As a landlord, I appreciate how professionally they handle the details. They found a great tenant and kept me updated throughout.', name: 'Mary N.', role: 'Property owner', image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=120&q=80' }
]
const reasons = [
  { icon: ShieldCheck, title: 'Verified listings', text: 'We check the details so you can view homes with confidence.' },
  { icon: Wallet, title: 'Fair, clear pricing', text: 'Know the rent and deposit up front. No confusing surprises.' },
  { icon: Clock3, title: 'A quick response', text: 'Our local team is here to help when you need us.' },
  { icon: Handshake, title: 'People you can trust', text: 'We build lasting relationships with tenants and landlords.' }
]

export default function Home() {
  const navigate = useNavigate()
  const { favorites, toggleFavorite } = useFavorites()
  const { properties, loading: propertiesLoading, storageError } = useProperties()
  const [search, setSearch] = useState({ location: '', type: '', budget: '', bedrooms: '' })
  const submitSearch = (event) => {
    event.preventDefault()
    const query = new URLSearchParams()
    Object.entries(search).forEach(([key, value]) => { if (value) query.set(key, value) })
    navigate(`/properties?${query.toString()}`)
  }
  return (
    <PageTransition>
      <PageMeta title="Find your perfect home in Nyahururu" description="Browse verified houses, apartments and rentals in Nyahururu. Get local help from Nyahururu Homes." />
      <section className="relative min-h-[620px] overflow-hidden bg-stone-900 sm:min-h-[690px]">
        <img src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=2200&q=90" alt="Modern family home surrounded by greenery" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#10251a]/90 via-[#10251a]/65 to-[#10251a]/15" />
        <div className="container-page relative flex min-h-[620px] items-center py-16 sm:min-h-[690px]">
          <div className="max-w-3xl text-white">
            <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-2 text-xs font-bold tracking-wide backdrop-blur"><span className="h-2 w-2 rounded-full bg-amber-400" /> LOCAL KNOW-HOW. A PLACE TO BELONG.</span>
            <h1 className="font-heading text-4xl font-extrabold leading-[1.12] sm:text-6xl">Find your perfect<br className="hidden sm:block" /> home in Nyahururu</h1>
            <p className="mt-5 max-w-xl text-base leading-7 text-white/85 sm:text-lg">From your first bedsitter to a home for the whole family, discover a place that feels just right.</p>
            <form onSubmit={submitSearch} className="mt-9 grid gap-2 rounded-2xl bg-white p-3 text-ink shadow-2xl md:grid-cols-[1.25fr_1fr_1fr_.75fr_auto] md:rounded-full">
              <label className="flex min-w-0 flex-col justify-center border-b border-stone-100 px-3 py-2 md:border-b-0 md:border-r"><span className="mb-1 text-[10px] font-bold uppercase tracking-wider text-stone-500">Location / estate</span><select value={search.location} onChange={(e) => setSearch({ ...search, location: e.target.value })} className="w-full bg-transparent text-sm font-semibold outline-none"><option value="">Anywhere in Nyahururu</option>{locations.map((location) => <option key={location}>{location}</option>)}</select></label>
              <label className="flex min-w-0 flex-col justify-center border-b border-stone-100 px-3 py-2 md:border-b-0 md:border-r"><span className="mb-1 text-[10px] font-bold uppercase tracking-wider text-stone-500">Property type</span><select value={search.type} onChange={(e) => setSearch({ ...search, type: e.target.value })} className="w-full bg-transparent text-sm font-semibold outline-none"><option value="">Any home type</option>{propertyTypes.map((type) => <option key={type}>{type}</option>)}</select></label>
              <label className="flex min-w-0 flex-col justify-center border-b border-stone-100 px-3 py-2 md:border-b-0 md:border-r"><span className="mb-1 text-[10px] font-bold uppercase tracking-wider text-stone-500">Max budget / month</span><select value={search.budget} onChange={(e) => setSearch({ ...search, budget: e.target.value })} className="w-full bg-transparent text-sm font-semibold outline-none"><option value="">Any budget</option><option value="10000">KES 10,000</option><option value="20000">KES 20,000</option><option value="30000">KES 30,000</option><option value="45000">KES 45,000</option><option value="60000">KES 60,000</option></select></label>
              <label className="flex min-w-0 flex-col justify-center px-3 py-2"><span className="mb-1 text-[10px] font-bold uppercase tracking-wider text-stone-500">Bedrooms</span><select value={search.bedrooms} onChange={(e) => setSearch({ ...search, bedrooms: e.target.value })} className="w-full bg-transparent text-sm font-semibold outline-none"><option value="">Any</option><option value="0">Studio</option><option value="1">1+</option><option value="2">2+</option><option value="3">3+</option></select></label>
              <button className="flex items-center justify-center gap-2 rounded-full bg-forest px-6 py-3 text-sm font-bold text-white transition hover:bg-forest-dark"><Search size={17} /> Search</button>
            </form>
            <p className="mt-4 text-xs text-white/70">Popular: <Link to="/properties?location=Ndururumo" className="underline underline-offset-4 hover:text-white">Ndururumo</Link> · <Link to="/properties?type=2+Bedroom" className="underline underline-offset-4 hover:text-white">2-bedroom homes</Link> · <Link to="/properties?budget=15000" className="underline underline-offset-4 hover:text-white">Under KES 15,000</Link></p>
          </div>
        </div>
      </section>

      <section className="border-b border-stone-100 bg-white">
        <div className="container-page grid grid-cols-2 gap-5 py-8 md:grid-cols-4">
          {[[propertiesLoading ? '—' : `${properties.length}+`, 'Homes listed', Building2], ['500+', 'Happy tenants', Users], ['10+', 'Years of experience', BadgeCheck], ['6', 'Local estates', MapPinIcon]].map(([number, label, Icon]) => <div key={label} className="flex items-center gap-3"><span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-green-50 text-forest"><Icon size={21} /></span><div><p className="font-heading text-xl font-extrabold text-forest">{number}</p><p className="text-xs text-stone-500">{label}</p></div></div>)}
        </div>
      </section>

      <section className="section-space container-page">
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end"><SectionHeading eyebrow="A few local favourites" title="Featured properties" description="A handpicked selection of homes in and around Nyahururu." /><Link to="/properties" className="mb-10 inline-flex items-center gap-2 text-sm font-bold text-forest hover:text-amber">Explore all properties <ArrowRight size={16} /></Link></div>
        {storageError && <p role="alert" className="mb-5 rounded-xl bg-amber-50 p-4 text-sm text-amber-900">{storageError}</p>}
        {propertiesLoading && <p role="status" className="mb-5 text-sm text-stone-500">Loading featured homes…</p>}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{properties.filter((property) => property.featured).slice(0, 6).map((property) => <PropertyCard key={property.id} property={property} favorite={favorites.includes(property.id)} onToggleFavorite={toggleFavorite} />)}</div>
      </section>

      <section className="bg-[#f1f5f1]">
        <div className="container-page section-space"><SectionHeading centered eyebrow="The Nyahururu Homes difference" title="Good homes. Good people." description="Renting should feel exciting, not overwhelming. We're here to make the journey easier." /><div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{reasons.map(({ icon: Icon, title, text }) => <article key={title} className="rounded-2xl bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-soft"><span className="grid h-12 w-12 place-items-center rounded-xl bg-green-50 text-forest"><Icon size={23} /></span><h3 className="mt-5 font-heading font-bold">{title}</h3><p className="mt-2 text-sm leading-6 text-stone-600">{text}</p></article>)}</div></div>
      </section>

      <section className="container-page section-space"><SectionHeading centered eyebrow="Simple from the start" title="How it works" description="Three easy steps to help you settle into a home you'll love." /><div className="grid gap-8 md:grid-cols-3">{[['01', 'Browse homes', 'Explore our local listings and tell us what matters most to you.'], ['02', 'Arrange a visit', 'We’ll help organise a viewing and answer your questions along the way.'], ['03', 'Move in', 'Agree the details, collect your keys and start settling in.']].map(([number, title, text]) => <div key={number} className="relative rounded-2xl border border-stone-100 bg-white p-7 text-center shadow-sm"><span className="font-heading text-5xl font-extrabold text-green-100">{number}</span><h3 className="mt-2 font-heading text-lg font-bold">{title}</h3><p className="mt-2 text-sm leading-6 text-stone-600">{text}</p></div>)}</div></section>

      <section className="bg-[#f1f5f1]"><div className="container-page section-space"><SectionHeading centered eyebrow="Kind words from our community" title="A little more at home" /><div className="grid gap-5 md:grid-cols-3">{reviews.map((review) => <TestimonialCard key={review.name} review={review} />)}</div></div></section>

      <section className="container-page py-16"><div className="relative overflow-hidden rounded-3xl bg-forest px-7 py-12 text-white sm:px-12 sm:py-14"><div className="absolute -right-8 -top-24 h-72 w-72 rounded-full border-[36px] border-white/5" /><div className="relative flex flex-col justify-between gap-7 md:flex-row md:items-center"><div><p className="eyebrow !text-amber-300">For property owners</p><h2 className="mt-3 font-heading text-3xl font-extrabold">Looking to list your property?</h2><p className="mt-3 max-w-xl text-sm leading-6 text-white/75">Let's connect you with the right tenants and take the hassle out of letting.</p></div><Button to="/contact" variant="light" className="shrink-0">Talk to our team <ArrowRight size={16} /></Button></div></div></section>
    </PageTransition>
  )
}

function MapPinIcon(props) {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="21" height="21" aria-hidden="true" {...props}><path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="2.5" /></svg>
}
