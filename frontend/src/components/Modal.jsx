import { useEffect } from 'react'
import { X } from 'lucide-react'

export default function Modal({ open, onClose, title, children }) {
  useEffect(() => {
    if (!open) return undefined
    const onKeyDown = (event) => { if (event.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKeyDown)
    document.body.style.overflow = 'hidden'
    return () => { document.removeEventListener('keydown', onKeyDown); document.body.style.overflow = '' }
  }, [open, onClose])
  if (!open) return null
  return <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/55 p-0 sm:items-center sm:p-5" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose() }}><section role="dialog" aria-modal="true" aria-label={title} className="max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-t-3xl bg-white shadow-2xl sm:rounded-3xl"><div className="sticky top-0 z-10 flex items-center justify-between border-b border-stone-100 bg-white px-5 py-4"><h2 className="font-heading font-bold">{title}</h2><button aria-label="Close dialog" onClick={onClose} className="grid h-9 w-9 place-items-center rounded-full bg-stone-100 text-stone-600 hover:bg-stone-200"><X size={18} /></button></div>{children}</section></div>
}
