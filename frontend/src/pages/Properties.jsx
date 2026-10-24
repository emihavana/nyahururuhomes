import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { ChevronDown, Filter, MapPin, Search, X } from 'lucide-react'
import PageMeta from '../components/PageMeta'
import PageTransition from '../components/PageTransition'
import PropertyCard from '../components/PropertyCard'
import FilterPanel from '../components/FilterPanel'
import Modal from '../components/Modal'
import Button from '../components/Button'
import useFavorites from '../hooks/useFavorites'
import { agency } from '../config'
import useProperties from '../hooks/useProperties'
import { propertyImageUrl } from '../lib/api'

const defaultFilters = { maxPrice: 60000, types: [], locations: [], amenities: [] }
const formatKes = (value) => new Intl.NumberFormat('en-KE').format(value)

export default function Properties() {
  const [params, setParams] = useSearchParams()
  const [filters, setFilters] = useState(() => ({
    ...defaultFilters,
    maxPrice: Number(params.get('budget')) || 60000,
    types: params.get('type') ? [params.get('type')] : [],
    locations: params.get('location') ? [params.get('location')] : []
  }))
  const [search, setSearch] = useState('')
  const [sort, setSort] = useState('newest')
  const [mobileFilters, setMobileFilters] = useState(false)
  const [visibleCount, setVisibleCount] = useState(6)
  const [selected, setSelected] = useState(null)
  const { favorites, toggleFavorite } = useFavorites()
  const { properties, loading, storageError } = useProperties()

  const filtered = useMemo(() => {
    const result = properties.filter((property) => {
      const textMatches = `${property.title} ${property.location} ${property.type}`.toLowerCase().includes(search.toLowerCase())
      return textMatches && property.price <= filters.maxPrice && (!filters.types.length || filters.types.includes(property.type)) && (!filters.locations.length || filters.locations.includes(property.location)) && filters.amenities.every((item) => property.amenities.includes(item))
    })
    if (sort === 'low') result.sort((a, b) => a.price - b.price)
    if (sort === 'high') result.sort((a, b) => b.price - a.price)
    if (sort === 'newest') result.sort((a, b) => b.dateAdded.localeCompare(a.dateAdded))
    return result
  }, [filters, properties, search, sort])

  const resetFilters = () => { setFilters(defaultFilters); setSearch(''); setParams({}) }
  const propertyFromQuery = params.get('property')
  const modalProperty = selected || properties.find((property) => property.id === propertyFromQuery)
  const closeModal = () => { setSelected(null); if (propertyFromQuery) setParams({}) }
  const openProperty = (property) => { setSelected(property); setParams({ property: property.id }) }
  return (
    <PageTransition>
      <PageMeta title="Homes for rent in Nyahururu" description="Browse houses and apartments for rent in Nyahururu. Filter local listings by rent, estate, home type and amenities." />
      <section className="relative isolate min-h-[440px] overflow-hidden bg-stone-900 sm:min-h-[500px]">
        <img src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=2200&q=90" alt="" className="absolute inset-0 -z-20 h-full w-full object-cover" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#10251a]/90 via-[#10251a]/65 to-[#10251a]/20" />
        <div className="container-page flex min-h-[440px] items-center py-20 sm:min-h-[500px]">
          <div className="max-w-3xl text-white">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-2 text-xs font-bold tracking-wide text-white backdrop-blur"><span className="h-2 w-2 rounded-full bg-amber-400" /> LOCAL HOMES. A FRESH START.</span>
            <h1 className="mt-5 font-heading text-4xl font-extrabold leading-[1.12] sm:text-6xl">Find a place to<br className="hidden sm:block" /> call home</h1>
            <p className="mt-5 max-w-xl text-base leading-7 text-white/85 sm:text-lg">Explore welcoming homes across Nyahururu, compare your options and find the right fit for your next chapter.</p>
            <a href="#available-homes" className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-bold text-forest transition hover:bg-green-50">Explore available homes <Search size={17} /></a>
          </div>
        </div>
      </section>
      <section id="available-homes" className="container-page scroll-mt-8 py-10">
        {storageError && <p role="alert" className="mb-5 rounded-xl bg-amber-50 p-4 text-sm leading-6 text-amber-900">{storageError}</p>}
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center">
          <form onSubmit={(e) => e.preventDefault()} className="flex flex-1 items-center gap-3 rounded-xl border border-stone-200 bg-white px-4 py-3"><Search size={18} className="text-stone-400" /><label htmlFor="property-search" className="sr-only">Search by estate, property or type</label><input id="property-search" value={search} onChange={(e) => { setSearch(e.target.value); setVisibleCount(6) }} placeholder="Search by estate, property or type..." className="w-full bg-transparent text-sm outline-none" />{search && <button type="button" aria-label="Clear search" onClick={() => setSearch('')}><X size={16} /></button>}</form>
          <button onClick={() => setMobileFilters(!mobileFilters)} aria-expanded={mobileFilters} className="flex items-center justify-center gap-2 rounded-xl border border-stone-200 bg-white px-4 py-3 text-sm font-bold text-forest lg:hidden"><Filter size={17} /> Filters</button>
          <label className="flex items-center justify-between gap-3 rounded-xl border border-stone-200 bg-white px-4 py-3 text-sm"><span className="text-stone-500">Sort by</span><span className="relative"><select value={sort} onChange={(e) => setSort(e.target.value)} className="appearance-none bg-transparent pr-6 font-bold outline-none"><option value="newest">Newest</option><option value="low">Price: low to high</option><option value="high">Price: high to low</option></select><ChevronDown size={15} className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2" /></span></label>
        </div>
        {mobileFilters && <div className="mb-6 lg:hidden"><FilterPanel filters={filters} setFilters={setFilters} onReset={resetFilters} /></div>}
        <div className="grid items-start gap-7 lg:grid-cols-[250px_1fr]">
          <aside className="hidden lg:block"><FilterPanel filters={filters} setFilters={setFilters} onReset={resetFilters} /></aside>
          <div>
            <p className="mb-4 text-sm text-stone-500">{loading ? 'Loading homes…' : <><strong className="text-ink">{filtered.length}</strong> {filtered.length === 1 ? 'home' : 'homes'} found</>}</p>
            {filtered.length ? <><div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">{filtered.slice(0, visibleCount).map((property) => <div key={property.id} onClick={(event) => { if (!event.target.closest('button, a')) openProperty(property) }} className="cursor-pointer"><PropertyCard property={property} favorite={favorites.includes(property.id)} onToggleFavorite={toggleFavorite} /></div>)}</div>{visibleCount < filtered.length && <div className="mt-9 text-center"><Button variant="outline" onClick={() => setVisibleCount((count) => count + 6)}>Load more homes</Button></div>}</> :
              <div className="rounded-2xl border border-dashed border-stone-300 bg-white px-5 py-16 text-center"><span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-green-50 text-forest"><MapPin /></span><h2 className="mt-4 font-heading text-xl font-bold">No homes match those filters</h2><p className="mx-auto mt-2 max-w-md text-sm leading-6 text-stone-500">Try a different estate or widen your budget. There may be a lovely place just outside your current search.</p><Button variant="outline" className="mt-6" onClick={resetFilters}>Clear filters</Button></div>}
          </div>
        </div>
      </section>
      <Modal open={Boolean(modalProperty)} onClose={closeModal} title={modalProperty?.title || 'Property details'}>
        {modalProperty && <PropertyDetails property={modalProperty} />}
      </Modal>
    </PageTransition>
  )
}

function PropertyDetails({ property }) {
  const [mainImage, setMainImage] = useState(property.gallery[0])
  const text = encodeURIComponent(`Hi ${agency.name}, I'm interested in viewing "${property.title}" in ${property.location}. Is it still available?`)
  return <div>
    <img src={propertyImageUrl(mainImage)} alt={property.title} className="h-64 w-full object-cover sm:h-80" />
    <div className="flex gap-2 overflow-x-auto p-4">{property.gallery.map((image) => <button key={image} onClick={() => setMainImage(image)} aria-label="Show property photo" className={`shrink-0 overflow-hidden rounded-lg border-2 ${image === mainImage ? 'border-forest' : 'border-transparent'}`}><img src={propertyImageUrl(image)} alt="" className="h-16 w-24 object-cover" /></button>)}</div>
    <div className="px-5 pb-6 sm:px-7"><p className="flex items-center gap-1 text-sm text-stone-500"><MapPin size={15} />{property.location}, Nyahururu</p><div className="mt-4 flex flex-wrap items-start justify-between gap-3"><div><h3 className="font-heading text-xl font-extrabold">{property.title}</h3><p className="mt-2 text-sm text-stone-500">{property.type} · {property.bedrooms || 'Studio'} bedroom · {property.bathrooms} bathroom</p></div><p className="font-heading text-xl font-extrabold text-forest">KES {formatKes(property.price)}<span className="font-sans text-xs font-medium text-stone-500"> / mo</span></p></div>
      <p className="mt-5 text-sm leading-7 text-stone-600">{property.description}</p><div className="mt-5 grid grid-cols-2 gap-3 rounded-xl bg-stone-50 p-4 text-sm"><p><span className="block text-xs text-stone-500">Monthly rent</span><strong>KES {formatKes(property.price)}</strong></p><p><span className="block text-xs text-stone-500">Deposit</span><strong>KES {formatKes(property.deposit)}</strong></p></div>
      <h4 className="mt-6 font-heading font-bold">Amenities</h4><div className="mt-3 flex flex-wrap gap-2">{property.amenities.map((amenity) => <span key={amenity} className="rounded-full bg-green-50 px-3 py-1.5 text-xs font-semibold text-forest">{amenity}</span>)}</div>
      <div className="mt-7 grid gap-3 sm:grid-cols-3"><Button href={`tel:${agency.phoneLink}`} className="w-full">Call agent</Button><Button href={`https://wa.me/${agency.whatsapp}?text=${text}`} target="_blank" rel="noreferrer" variant="outline" className="w-full">WhatsApp us</Button><Button href={`/contact?inquiry=viewing&property=${encodeURIComponent(property.title)}`} variant="outline" className="w-full">Book a viewing</Button></div>
    </div>
  </div>
}
