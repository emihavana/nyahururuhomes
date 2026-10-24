import { MessageCircle } from 'lucide-react'
import { agency } from '../config'

export default function WhatsAppFloat() {
  const message = encodeURIComponent(`Hi ${agency.name}, I'm looking for a home in Nyahururu.`)
  return <a href={`https://wa.me/${agency.whatsapp}?text=${message}`} target="_blank" rel="noreferrer" aria-label="Chat with us on WhatsApp" className="fixed bottom-5 right-5 z-30 grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-lg transition hover:scale-105"><MessageCircle size={26} /></a>
}
