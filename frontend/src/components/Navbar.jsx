import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Menu, X, Phone, Home } from 'lucide-react'
import { agency } from '../config'
import Button from './Button'

const links = [['Home', '/'], ['Properties', '/properties'], ['About', '/about'], ['Contact', '/contact'], ['Manage', '/manage']]

export default function Navbar({ variant = 'default' }) {
  const [open, setOpen] = useState(false)
  const isHero = variant === 'hero'
  return (
    <header className={isHero
      ? 'absolute inset-x-0 top-0 z-40 border-b border-white/15 bg-[#10251a]/20 text-white backdrop-blur-md'
      : 'sticky top-0 z-40 border-b border-stone-100 bg-white/95 backdrop-blur'}>
      <div className="container-page flex h-[72px] items-center justify-between">
        <Link to="/" className="flex min-w-0 items-center gap-2.5" aria-label={`${agency.name} home`} onClick={() => setOpen(false)}>
          <span className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl ${isHero ? 'bg-white/15 text-white' : 'bg-forest text-white'}`}><Home size={21} /></span>
          <span className="min-w-0"><span className={`block truncate font-heading text-sm font-extrabold leading-tight sm:text-base ${isHero ? 'text-white' : 'text-forest'}`}>{agency.name}</span><span className={`${isHero ? 'hidden text-white/70 sm:block' : 'text-stone-500'} text-[10px] font-semibold tracking-wide`}>A BETTER PLACE TO CALL HOME</span></span>
        </Link>
        <nav className="hidden items-center gap-8 md:flex" aria-label="Main navigation">
          {links.map(([label, path]) => <NavLink key={path} to={path} className={({ isActive }) => `text-sm font-semibold transition ${isHero ? `hover:text-amber-200 ${isActive ? 'text-white' : 'text-white/80'}` : `hover:text-forest ${isActive ? 'text-forest' : 'text-stone-600'}`}`}>{label}</NavLink>)}
        </nav>
        <Button href={`tel:${agency.phoneLink}`} variant={isHero ? 'light' : 'primary'} className="hidden !px-5 !py-2.5 md:inline-flex"><Phone size={16} /> Call Now</Button>
        <button className={`grid h-10 w-10 place-items-center rounded-lg md:hidden ${isHero ? 'text-white hover:bg-white/10' : 'text-forest'}`} aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button>
      </div>
      {open && <nav className={`border-t px-5 py-4 shadow-lg md:hidden ${isHero ? 'border-white/15 bg-[#10251a]/95' : 'border-stone-100 bg-white'}`} aria-label="Mobile navigation">
        {links.map(([label, path]) => <NavLink key={path} to={path} onClick={() => setOpen(false)} className={({ isActive }) => `block rounded-lg px-3 py-3 text-sm font-semibold ${isHero ? (isActive ? 'bg-white/15 text-white' : 'text-white/85') : (isActive ? 'bg-green-50 text-forest' : 'text-stone-700')}`}>{label}</NavLink>)}
        <a href={`tel:${agency.phoneLink}`} className={`mt-2 flex items-center gap-2 rounded-lg px-3 py-3 text-sm font-bold ${isHero ? 'bg-white text-forest' : 'bg-forest text-white'}`}><Phone size={16} /> Call Now</a>
      </nav>}
    </header>
  )
}
