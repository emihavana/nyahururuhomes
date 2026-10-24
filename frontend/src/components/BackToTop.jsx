import { useEffect, useState } from 'react'
import { ArrowUp } from 'lucide-react'

export default function BackToTop() {
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 500)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  if (!visible) return null
  return <button aria-label="Back to top" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="fixed bottom-[88px] right-7 z-30 grid h-10 w-10 place-items-center rounded-full border border-stone-200 bg-white text-forest shadow-md transition hover:-translate-y-1"><ArrowUp size={18} /></button>
}
