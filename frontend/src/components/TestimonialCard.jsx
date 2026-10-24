import { Star } from 'lucide-react'

export default function TestimonialCard({ review }) {
  return <article className="rounded-2xl border border-stone-100 bg-white p-6 shadow-sm"><div className="flex gap-1 text-amber" aria-label="5 out of 5 stars">{Array.from({ length: 5 }, (_, i) => <Star key={i} size={15} fill="currentColor" />)}</div><p className="mt-4 text-sm leading-7 text-stone-600">“{review.quote}”</p><div className="mt-5 flex items-center gap-3"><img src={review.image} alt="" className="h-11 w-11 rounded-full object-cover" /><div><p className="text-sm font-bold">{review.name}</p><p className="text-xs text-stone-500">{review.role}</p></div></div></article>
}
