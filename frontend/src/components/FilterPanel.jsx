import { amenities, locations, propertyTypes } from '../config'

export default function FilterPanel({ filters, setFilters, onReset }) {
  const set = (key, value) => setFilters((current) => ({ ...current, [key]: value }))
  const toggle = (key, value) => set(key, filters[key].includes(value) ? filters[key].filter((item) => item !== value) : [...filters[key], value])
  return (
    <div className="space-y-6 rounded-2xl border border-stone-100 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between"><h2 className="font-heading font-bold">Filters</h2><button onClick={onReset} className="text-xs font-bold text-forest underline underline-offset-4">Clear all</button></div>
      <div><div className="flex justify-between text-sm font-semibold"><span>Monthly rent</span><span className="text-forest">Up to KES {new Intl.NumberFormat('en-KE').format(filters.maxPrice)}</span></div><input aria-label="Maximum monthly rent" type="range" min="5000" max="60000" step="1000" value={filters.maxPrice} onChange={(e) => set('maxPrice', Number(e.target.value))} className="range-control mt-4 w-full" /><div className="flex justify-between text-xs text-stone-400"><span>KES 5,000</span><span>KES 60,000+</span></div></div>
      <fieldset><legend className="mb-3 text-sm font-bold">Property type</legend><div className="grid grid-cols-2 gap-y-2">{propertyTypes.map((type) => <label key={type} className="flex cursor-pointer items-center gap-2 text-sm text-stone-600"><input type="checkbox" checked={filters.types.includes(type)} onChange={() => toggle('types', type)} className="accent-forest" />{type}</label>)}</div></fieldset>
      <fieldset><legend className="mb-3 text-sm font-bold">Estate / location</legend><div className="grid gap-y-2">{locations.map((location) => <label key={location} className="flex cursor-pointer items-center gap-2 text-sm text-stone-600"><input type="checkbox" checked={filters.locations.includes(location)} onChange={() => toggle('locations', location)} className="accent-forest" />{location}</label>)}</div></fieldset>
      <fieldset><legend className="mb-3 text-sm font-bold">Amenities</legend><div className="grid grid-cols-2 gap-y-2">{amenities.map((item) => <label key={item} className="flex cursor-pointer items-center gap-2 text-sm text-stone-600"><input type="checkbox" checked={filters.amenities.includes(item)} onChange={() => toggle('amenities', item)} className="accent-forest" />{item}</label>)}</div></fieldset>
    </div>
  )
}
