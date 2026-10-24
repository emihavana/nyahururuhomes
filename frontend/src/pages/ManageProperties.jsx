import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight, Building2, Eye, HousePlus, ImagePlus, LogOut, Pencil, Plus, Search, Trash2, X } from 'lucide-react'
import PageMeta from '../components/PageMeta'
import PageTransition from '../components/PageTransition'
import Modal from '../components/Modal'
import Button from '../components/Button'
import useProperties from '../hooks/useProperties'
import useAdminAuth from '../hooks/useAdminAuth'
import { amenities, locations, propertyTypes } from '../config'
import { propertyImageUrl, uploadPropertyImage } from '../lib/api'

const emptyForm = {
  title: '',
  location: '',
  type: '',
  price: '',
  deposit: '',
  bedrooms: '1',
  bathrooms: '1',
  status: 'Available',
  image: '',
  imageFile: null,
  description: '',
  amenities: []
}

const kes = (value) => new Intl.NumberFormat('en-KE').format(value)

export default function ManageProperties() {
  const { properties, loading, createProperty, updateProperty, deleteProperty, storageError } = useProperties()
  const { loading: authLoading, authenticated, email, error: authError, signIn, signOut } = useAdminAuth()
  const [query, setQuery] = useState('')
  const [login, setLogin] = useState({ email: '', password: '' })
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState(emptyForm)
  const [formError, setFormError] = useState('')
  const [confirmDelete, setConfirmDelete] = useState(null)
  const [notice, setNotice] = useState('')
  const [savingForm, setSavingForm] = useState(false)

  const filtered = properties.filter((property) => `${property.title} ${property.location} ${property.type}`.toLowerCase().includes(query.toLowerCase()))
  const openCreate = () => {
    setEditing('new')
    setForm(emptyForm)
    setFormError('')
    setNotice('')
  }
  const openEdit = (property) => {
    setEditing(property.id)
    setForm({
      title: property.title,
      location: property.location,
      type: property.type,
      price: String(property.price),
      deposit: String(property.deposit),
      bedrooms: String(property.bedrooms),
      bathrooms: String(property.bathrooms),
      status: property.status,
      image: property.image,
      imageFile: null,
      description: property.description,
      amenities: property.amenities || []
    })
    setFormError('')
    setNotice('')
  }
  const closeForm = () => { setEditing(null); setFormError('') }
  const setField = (key, value) => setForm((current) => ({ ...current, [key]: value }))
  const toggleAmenity = (amenity) => setForm((current) => ({
    ...current,
    amenities: current.amenities.includes(amenity)
      ? current.amenities.filter((item) => item !== amenity)
      : [...current.amenities, amenity]
  }))
  const submit = async (event) => {
    event.preventDefault()
    const imageValue = form.image.trim()
    const storedImagePath = /^\/nyahururu-homes-api\/uploads\/[a-f0-9]{32}\.(?:jpg|png|webp)$/i
    if (!form.imageFile && !/^https?:\/\/\S+$/i.test(imageValue) && !storedImagePath.test(imageValue)) {
      setFormError('Upload a JPG, PNG or WebP image, or enter a valid http:// or https:// image URL.')
      return
    }
    setSavingForm(true)
    setFormError('')
    try {
      const image = form.imageFile ? await uploadPropertyImage(form.imageFile) : imageValue
      const values = {
        ...form,
        imageFile: undefined,
        title: form.title.trim(),
        location: form.location.trim(),
        price: Number(form.price),
        deposit: Number(form.deposit),
        bedrooms: Number(form.bedrooms),
        bathrooms: Number(form.bathrooms),
        image,
        description: form.description.trim()
      }
      const saved = await (editing === 'new'
        ? createProperty(values)
        : updateProperty(editing, values))
      if (saved) {
        setNotice(editing === 'new' ? 'Property added.' : 'Property updated.')
        closeForm()
      } else {
        setFormError('Could not save this listing. Check the API error shown on the page and try again.')
      }
    } catch (error) {
      setFormError(error.message)
    } finally {
      setSavingForm(false)
    }
  }
  const removeProperty = async () => {
    const removed = await deleteProperty(confirmDelete.id)
    if (removed) {
      setNotice(`“${confirmDelete.title}” was deleted.`)
      setConfirmDelete(null)
    }
  }
  const handleLogin = async (event) => {
    event.preventDefault()
    const signedIn = await signIn(login.email, login.password)
    if (signedIn) {
      setLogin({ email: '', password: '' })
    }
  }

  if (authLoading) {
    return <PageTransition><PageMeta title="Admin sign in" description="Sign in to manage property listings." /><section className="container-page grid min-h-[55vh] place-items-center"><p role="status" className="text-sm text-stone-500">Checking administrator session…</p></section></PageTransition>
  }

  if (!authenticated) {
    return <PageTransition>
      <PageMeta title="Admin sign in" description="Sign in to manage property listings." />
      <section className="relative isolate grid min-h-[620px] place-items-center overflow-hidden bg-stone-900 px-4 py-14 sm:min-h-[680px]">
        <img src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=2200&q=90" alt="" className="absolute inset-0 -z-20 h-full w-full object-cover" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-[#10251a]/80 via-[#10251a]/60 to-[#10251a]/75" />
        <form onSubmit={handleLogin} className="w-full max-w-md rounded-3xl border border-white/70 bg-white/95 p-6 shadow-2xl backdrop-blur sm:p-9">
          <p className="eyebrow mb-3">Welcome back</p>
          <h1 className="font-heading text-2xl font-extrabold text-ink sm:text-3xl">Manage your listings</h1>
          <p className="mt-2 text-sm leading-6 text-stone-600">Sign in to continue to your property dashboard.</p>
          {authError && <p role="alert" className="mt-5 rounded-lg bg-red-50 p-3 text-sm leading-6 text-red-800">{authError}</p>}
          <label className="mt-6 grid gap-1.5 text-sm font-semibold">Email address<input required type="email" autoComplete="username" value={login.email} onChange={(event) => setLogin({ ...login, email: event.target.value })} className="rounded-lg border border-stone-200 px-3 py-3 font-normal outline-none focus:border-forest" /></label>
          <label className="mt-4 grid gap-1.5 text-sm font-semibold">Password<input required type="password" autoComplete="current-password" value={login.password} onChange={(event) => setLogin({ ...login, password: event.target.value })} className="rounded-lg border border-stone-200 px-3 py-3 font-normal outline-none focus:border-forest" /></label>
          <Button type="submit" className="mt-6 w-full">Sign in</Button>
        </form>
      </section>
    </PageTransition>
  }

  return <PageTransition>
    <PageMeta title="Manage properties" description="Create, view, edit and delete Nyahururu Homes property listings." />
    <section className="bg-[#f1f5f1] py-12 sm:py-16">
      <div className="container-page">
        <p className="mb-4 text-xs text-stone-500"><Link to="/" className="hover:text-forest">Home</Link><span className="mx-2">/</span><span className="font-semibold text-forest">Manage properties</span></p>
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div><p className="eyebrow mb-3">Property administration</p><h1 className="font-heading text-3xl font-extrabold sm:text-4xl">Manage your listings</h1><p className="mt-3 max-w-2xl text-sm leading-6 text-stone-600">Add new homes, keep listing details current, and remove properties that are no longer available.</p></div>
          <div className="flex flex-wrap items-center gap-3"><span className="text-xs text-stone-500">Signed in as {email}</span><Button variant="outline" onClick={signOut}><LogOut size={16} /> Sign out</Button><Button onClick={openCreate}><Plus size={17} /> Add a property</Button></div>
        </div>
      </div>
    </section>

    <section className="container-page py-9">
      <div role="note" className="mb-6 rounded-xl border border-green-200 bg-green-50 p-4 text-sm leading-6 text-forest"><strong>Database connected:</strong> Listings are managed in the configured MySQL database.</div>
      {storageError && <div role="alert" className="mb-5 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-800">{storageError}</div>}
      {notice && <div role="status" className="mb-5 flex items-center justify-between rounded-xl border border-green-200 bg-green-50 p-4 text-sm text-forest">{notice}<button aria-label="Dismiss notification" onClick={() => setNotice('')}><X size={17} /></button></div>}
      <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div><p className="font-heading text-xl font-bold">{properties.length} {properties.length === 1 ? 'property' : 'properties'}</p><p className="mt-1 text-sm text-stone-500">Manage all rental listings</p></div>
        <label className="flex items-center gap-2 rounded-xl border border-stone-200 bg-white px-4 py-3 sm:w-80"><Search size={17} className="text-stone-400" /><span className="sr-only">Search your listings</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search listings..." className="w-full bg-transparent text-sm outline-none" /></label>
      </div>
      <div className="overflow-hidden rounded-2xl border border-stone-100 bg-white shadow-sm">
        <div className="hidden grid-cols-[minmax(220px,1.6fr)_1fr_1fr_1fr_150px] gap-4 border-b border-stone-100 bg-stone-50 px-5 py-3 text-xs font-bold uppercase tracking-wide text-stone-500 md:grid"><span>Property</span><span>Estate</span><span>Monthly rent</span><span>Status</span><span className="text-right">Actions</span></div>
        {loading ? <p role="status" className="px-5 py-12 text-center text-sm text-stone-500">Loading listings from MySQL…</p> : filtered.length > 0 ? filtered.map((property) => <article key={property.id} className="grid gap-4 border-b border-stone-100 p-4 last:border-0 md:grid-cols-[minmax(220px,1.6fr)_1fr_1fr_1fr_150px] md:items-center md:px-5">
          <div className="flex min-w-0 items-center gap-3"><img src={propertyImageUrl(property.image)} alt="" className="h-16 w-20 shrink-0 rounded-lg object-cover" /><div className="min-w-0"><p className="truncate font-heading text-sm font-bold">{property.title}</p><p className="mt-1 text-xs text-stone-500">{property.type} · {property.bedrooms || 'Studio'} bed · {property.bathrooms} bath</p></div></div>
          <p className="text-sm text-stone-600"><span className="mr-2 text-xs font-semibold text-stone-400 md:hidden">Estate</span>{property.location}</p>
          <p className="text-sm font-bold text-forest"><span className="mr-2 text-xs font-semibold text-stone-400 md:hidden">Rent</span>KES {kes(property.price)}</p>
          <span className={`w-fit rounded-full px-3 py-1 text-xs font-bold ${property.status === 'Available' ? 'bg-green-50 text-forest' : 'bg-stone-100 text-stone-600'}`}>{property.status}</span>
          <div className="flex flex-wrap gap-2 md:justify-end">
            <Link title={`View ${property.title}`} aria-label={`View ${property.title}`} to={`/properties?property=${encodeURIComponent(property.id)}`} className="grid h-9 w-9 place-items-center rounded-lg border border-stone-200 text-stone-600 hover:border-forest hover:text-forest"><Eye size={16} /></Link>
            <button title={`Edit ${property.title}`} aria-label={`Edit ${property.title}`} onClick={() => openEdit(property)} className="grid h-9 w-9 place-items-center rounded-lg border border-stone-200 text-stone-600 hover:border-forest hover:text-forest"><Pencil size={16} /></button>
            <button title={`Delete ${property.title}`} aria-label={`Delete ${property.title}`} onClick={() => setConfirmDelete(property)} className="grid h-9 w-9 place-items-center rounded-lg border border-stone-200 text-stone-600 hover:border-red-300 hover:text-red-700"><Trash2 size={16} /></button>
          </div>
        </article>) : <div className="px-5 py-16 text-center"><Building2 className="mx-auto text-stone-300" size={36} /><h2 className="mt-3 font-heading text-lg font-bold">No properties found</h2><p className="mt-1 text-sm text-stone-500">{query ? 'Try a different search.' : 'Add your first listing to get started.'}</p></div>}
      </div>
      <p className="mt-5 text-xs text-stone-500">Changes are available in the public listings. <Link to="/properties" className="inline-flex items-center gap-1 font-bold text-forest hover:text-amber">View properties <ArrowUpRight size={14} /></Link></p>
    </section>

    <Modal open={editing !== null} onClose={closeForm} title={editing === 'new' ? 'Add a property' : 'Edit property'}>
      <PropertyForm form={form} setField={setField} toggleAmenity={toggleAmenity} onSubmit={submit} onCancel={closeForm} error={formError} isNew={editing === 'new'} saving={savingForm} />
    </Modal>
    <Modal open={Boolean(confirmDelete)} onClose={() => setConfirmDelete(null)} title="Delete this property?">
      {confirmDelete && <div className="p-6"><p className="text-sm leading-6 text-stone-600">This will permanently remove <strong className="text-ink">{confirmDelete.title}</strong> from this browser’s saved listings. This action cannot be undone.</p><div className="mt-6 flex justify-end gap-3"><Button variant="outline" onClick={() => setConfirmDelete(null)}>Cancel</Button><Button className="!bg-red-700 hover:!bg-red-800" onClick={removeProperty}><Trash2 size={16} /> Delete property</Button></div></div>}
    </Modal>
  </PageTransition>
}

function PropertyForm({ form, setField, toggleAmenity, onSubmit, onCancel, error, isNew, saving }) {
  const input = 'w-full rounded-lg border border-stone-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-forest'
  return <form onSubmit={onSubmit} className="space-y-4 p-5 sm:p-7">
    {error && <p role="alert" className="rounded-lg bg-red-50 p-3 text-sm text-red-800">{error}</p>}
    <label className="grid gap-1.5 text-sm font-semibold">Property title<input required maxLength="90" value={form.title} onChange={(event) => setField('title', event.target.value)} placeholder="e.g. Bright 2-bedroom apartment" className={input} /></label>
    <div className="grid gap-4 sm:grid-cols-2">
      <label className="grid gap-1.5 text-sm font-semibold">Property type<select required value={form.type} onChange={(event) => setField('type', event.target.value)} className={input}><option value="">Select a type</option>{propertyTypes.map((type) => <option key={type}>{type}</option>)}</select></label>
      <label className="grid gap-1.5 text-sm font-semibold">Estate / location<select required value={form.location} onChange={(event) => setField('location', event.target.value)} className={input}><option value="">Select an estate</option>{locations.map((location) => <option key={location}>{location}</option>)}</select></label>
    </div>
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
      <label className="grid gap-1.5 text-sm font-semibold">Rent / month (KES)<input required type="number" min="0" step="100" value={form.price} onChange={(event) => setField('price', event.target.value)} className={input} /></label>
      <label className="grid gap-1.5 text-sm font-semibold">Deposit (KES)<input required type="number" min="0" step="100" value={form.deposit} onChange={(event) => setField('deposit', event.target.value)} className={input} /></label>
      <label className="grid gap-1.5 text-sm font-semibold">Bedrooms<input required type="number" min="0" max="20" value={form.bedrooms} onChange={(event) => setField('bedrooms', event.target.value)} className={input} /></label>
      <label className="grid gap-1.5 text-sm font-semibold">Bathrooms<input required type="number" min="1" max="20" value={form.bathrooms} onChange={(event) => setField('bathrooms', event.target.value)} className={input} /></label>
    </div>
    <div className="grid gap-4 sm:grid-cols-2">
      <label className="grid gap-1.5 text-sm font-semibold">Listing status<select value={form.status} onChange={(event) => setField('status', event.target.value)} className={input}><option>Available</option><option>Taken</option></select></label>
      <div className="grid gap-3">
        <label className="grid gap-1.5 text-sm font-semibold">Upload a listing image<input type="file" accept="image/jpeg,image/png,image/webp" onChange={(event) => setField('imageFile', event.target.files?.[0] || null)} className={`${input} file:mr-3 file:rounded-md file:border-0 file:bg-green-50 file:px-3 file:py-1.5 file:text-xs file:font-bold file:text-forest`} /><span className="text-xs font-normal text-stone-500">JPG, PNG or WebP, up to 5 MB. The image is saved on the Laragon server.</span>{form.imageFile && <span role="status" className="text-xs font-medium text-forest">{form.imageFile.name} will be uploaded when you save.</span>}</label>
        <label className="grid gap-1.5 text-sm font-semibold">Or use an image URL<input type="text" inputMode="url" value={form.imageFile ? '' : form.image} onChange={(event) => setField('image', event.target.value)} placeholder="https://example.com/property.jpg" className={input} /><span className="text-xs font-normal text-stone-500">If both are selected, the uploaded image will be used.</span></label>
        {form.image && !form.imageFile && <img src={propertyImageUrl(form.image)} alt="Current listing" className="h-32 w-full rounded-lg object-cover" />}
      </div>
    </div>
    <label className="grid gap-1.5 text-sm font-semibold">Description<textarea required minLength="10" maxLength="1200" rows="4" value={form.description} onChange={(event) => setField('description', event.target.value)} className={`${input} resize-y`} /></label>
    <fieldset><legend className="mb-2 text-sm font-semibold">Amenities</legend><div className="flex flex-wrap gap-x-5 gap-y-2">{amenities.map((amenity) => <label key={amenity} className="flex items-center gap-2 text-sm text-stone-600"><input type="checkbox" checked={form.amenities.includes(amenity)} onChange={() => toggleAmenity(amenity)} className="accent-forest" />{amenity}</label>)}</div></fieldset>
    <div className="flex justify-end gap-3 border-t border-stone-100 pt-4"><Button variant="outline" type="button" onClick={onCancel} disabled={saving}>Cancel</Button><Button type="submit" disabled={saving}>{form.imageFile ? <ImagePlus size={16} /> : <HousePlus size={16} />}{saving ? 'Uploading and saving…' : isNew ? 'Create listing' : 'Save changes'}</Button></div>
  </form>
}
