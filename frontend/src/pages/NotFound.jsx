import { Link } from 'react-router-dom'
import { Home, Search } from 'lucide-react'
import PageMeta from '../components/PageMeta'
import PageTransition from '../components/PageTransition'

export default function NotFound() {
  return <PageTransition><PageMeta title="Page not found" description="The page you're looking for could not be found." /><section className="container-page grid min-h-[60vh] place-items-center py-16 text-center"><div><p className="font-heading text-8xl font-extrabold text-green-100">404</p><h1 className="mt-3 font-heading text-3xl font-extrabold">Looks like this page moved out.</h1><p className="mx-auto mt-3 max-w-md text-sm leading-6 text-stone-500">Sorry, we can’t find the page you’re looking for. Let’s help you find your way home.</p><div className="mt-7 flex flex-wrap justify-center gap-3"><Link to="/" className="inline-flex items-center gap-2 rounded-full bg-forest px-5 py-3 text-sm font-bold text-white"><Home size={16} /> Back home</Link><Link to="/properties" className="inline-flex items-center gap-2 rounded-full border border-forest px-5 py-3 text-sm font-bold text-forest"><Search size={16} /> Browse homes</Link></div></div></section></PageTransition>
}
