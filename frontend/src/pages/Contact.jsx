import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Clock3, Mail, MapPin, MessageCircle, Phone, Send } from 'lucide-react'
import PageMeta from '../components/PageMeta'
import PageTransition from '../components/PageTransition'
import SectionHeading from '../components/SectionHeading'
import { agency } from '../config'

const faqs = [
  ['How much deposit do I need to pay?', 'The deposit is usually equivalent to one month of rent, but it can vary by property. The exact amount is shown on each listing and confirmed before you commit.'],
  ['Can I view a property before I decide?', 'Absolutely. Contact our team with the home you are interested in and we will help arrange a suitable viewing time.'],
  ['How long are the lease terms?', 'Lease terms vary by landlord and property. We will explain the proposed terms clearly before you make a decision.'],
  ['Are utilities included in the rent?', 'Utilities are not always included. Please ask us about water, electricity, internet and any shared service costs for a specific listing.'],
  ['What should I bring to a viewing?', 'Bring any questions you have and take time to check the spaces and facilities that matter to you. There is no obligation to rent after a viewing.'],
  ['Do you help landlords list their properties?', 'Yes. We support local landlords with property listings, tenant enquiries, vetting and property management. Send us a message to get started.']
]

export default function Contact() {
  const [params] = useSearchParams()
  const [openFaq, setOpenFaq] = useState(0)
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({ name: '', phone: '', email: '', inquiry: params.get('inquiry') === 'viewing' ? 'viewing' : 'rent', message: params.get('property') ? `I would like to book a viewing for ${params.get('property')}.` : '' })
  const update = (key, value) => setForm((current) => ({ ...current, [key]: value }))
  const submit = (event) => {
    event.preventDefault()
    setSubmitted(true)
    setForm({ name: '', phone: '', email: '', inquiry: 'rent', message: '' })
  }
  return <PageTransition>
    <PageMeta title="Contact our Nyahururu team" description="Get in touch with Nyahururu Homes to ask about a rental, arrange a viewing or list your property." />
    <section className="relative isolate min-h-[440px] overflow-hidden bg-stone-900 sm:min-h-[500px]">
      <img src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=2200&q=90" alt="" className="absolute inset-0 -z-20 h-full w-full object-cover" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#10251a]/90 via-[#10251a]/65 to-[#10251a]/20" />
      <div className="container-page flex min-h-[440px] items-center py-20 sm:min-h-[500px]">
        <div className="max-w-3xl text-white">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-2 text-xs font-bold tracking-wide text-white backdrop-blur"><span className="h-2 w-2 rounded-full bg-amber-400" /> LOCAL PEOPLE. HERE TO HELP.</span>
          <h1 className="mt-5 font-heading text-4xl font-extrabold leading-[1.12] sm:text-6xl">Let’s talk about<br className="hidden sm:block" /> finding home</h1>
          <p className="mt-5 max-w-xl text-base leading-7 text-white/85 sm:text-lg">Looking for a place, ready to list, or just have a question? Our Nyahururu team is happy to help.</p>
          <a href="#contact-message" className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-bold text-forest transition hover:bg-green-50">Get in touch <Send size={16} /></a>
        </div>
      </div>
    </section>
    <section id="contact-message" className="container-page scroll-mt-8 grid gap-8 py-12 lg:grid-cols-[1.1fr_.9fr]">
      <div className="rounded-2xl border border-stone-100 bg-white p-6 shadow-sm sm:p-8">
        <h2 className="font-heading text-xl font-bold">Send us a message</h2><p className="mt-2 text-sm text-stone-500">Fill in the form and we’ll get back to you as soon as we can.</p>
        {submitted && <div role="status" className="mt-5 rounded-xl border border-green-200 bg-green-50 p-4 text-sm leading-6 text-forest"><strong>Thank you for reaching out!</strong> Your message has been noted. Please call or WhatsApp us if you need a quicker response.</div>}
        <form onSubmit={submit} className="mt-6 space-y-4">
          <div className="grid gap-4 sm:grid-cols-2"><label className="grid gap-1.5 text-sm font-semibold">Your name<input required minLength="2" value={form.name} onChange={(e) => update('name', e.target.value)} autoComplete="name" placeholder="e.g. Jane Wanjiku" className="rounded-lg border border-stone-200 px-3 py-3 font-normal outline-none focus:border-forest" /></label><label className="grid gap-1.5 text-sm font-semibold">Phone number<input required type="tel" pattern="(\+254|0)[0-9 ]{9,12}" value={form.phone} onChange={(e) => update('phone', e.target.value)} autoComplete="tel" placeholder="+254 7XX XXX XXX" className="rounded-lg border border-stone-200 px-3 py-3 font-normal outline-none focus:border-forest" /></label></div>
          <label className="grid gap-1.5 text-sm font-semibold">Email address<input required type="email" value={form.email} onChange={(e) => update('email', e.target.value)} autoComplete="email" placeholder="you@example.com" className="rounded-lg border border-stone-200 px-3 py-3 font-normal outline-none focus:border-forest" /></label>
          <label className="grid gap-1.5 text-sm font-semibold">How can we help?<select value={form.inquiry} onChange={(e) => update('inquiry', e.target.value)} className="rounded-lg border border-stone-200 bg-white px-3 py-3 font-normal outline-none focus:border-forest"><option value="rent">I want to rent</option><option value="viewing">Book a viewing</option><option value="list">I want to list my property</option><option value="other">Other</option></select></label>
          <label className="grid gap-1.5 text-sm font-semibold">Your message<textarea required minLength="10" rows="4" value={form.message} onChange={(e) => update('message', e.target.value)} placeholder="Tell us a little about what you need..." className="resize-y rounded-lg border border-stone-200 px-3 py-3 font-normal outline-none focus:border-forest" /></label>
          <button className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-forest px-6 py-3.5 text-sm font-bold text-white transition hover:bg-forest-dark sm:w-auto">Send your message <Send size={16} /></button>
          <p className="text-xs leading-5 text-stone-400">This demo form does not send data to a server. For a quick reply, call or WhatsApp us directly.</p>
        </form>
      </div>
      <div>
        <div className="grid gap-3 sm:grid-cols-2">
          <ContactCard icon={Phone} title="Call us" text={agency.phone} href={`tel:${agency.phoneLink}`} />
          <ContactCard icon={MessageCircle} title="WhatsApp" text="Chat with our team" href={`https://wa.me/${agency.whatsapp}`} />
          <ContactCard icon={Mail} title="Email" text={agency.email} href={`mailto:${agency.email}`} />
          <ContactCard icon={Clock3} title="Working hours" text={agency.hours} />
          <ContactCard icon={MapPin} title="Visit our office" text={agency.address} className="sm:col-span-2" />
        </div>
        <div className="mt-4 overflow-hidden rounded-2xl border border-stone-200 bg-stone-100"><iframe title="Map showing Nyahururu, Kenya" src="https://maps.google.com/maps?q=Nyahururu%2C%20Kenya&t=&z=13&ie=UTF8&iwloc=&output=embed" width="100%" height="260" loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="border-0" /></div>
      </div>
    </section>
    <section className="bg-[#f1f5f1]"><div className="container-page section-space"><SectionHeading centered eyebrow="A few useful answers" title="Frequently asked questions" description="Have another question? Give our friendly team a call." /><div className="mx-auto max-w-3xl divide-y divide-stone-200 rounded-2xl bg-white px-5 shadow-sm sm:px-7">{faqs.map(([question, answer], index) => <div key={question} className="py-5"><button className="flex w-full items-center justify-between gap-4 text-left font-heading text-sm font-bold sm:text-base" aria-expanded={openFaq === index} onClick={() => setOpenFaq(openFaq === index ? -1 : index)}>{question}<span className={`text-xl text-forest transition-transform ${openFaq === index ? 'rotate-45' : ''}`}>+</span></button>{openFaq === index && <p className="mt-3 max-w-2xl text-sm leading-7 text-stone-600">{answer}</p>}</div>)}</div></div></section>
  </PageTransition>
}

function ContactCard({ icon: Icon, title, text, href, className = '' }) {
  const content = <><span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-green-50 text-forest"><Icon size={19} /></span><span><span className="block text-xs font-bold uppercase tracking-wide text-stone-500">{title}</span><span className="mt-1 block text-sm font-semibold leading-5 text-ink">{text}</span></span></>
  return href ? <a href={href} target={href.startsWith('https:') ? '_blank' : undefined} rel={href.startsWith('https:') ? 'noreferrer' : undefined} className={`flex items-start gap-3 rounded-xl border border-stone-100 bg-white p-4 transition hover:border-green-200 hover:shadow-sm ${className}`}>{content}</a> : <div className={`flex items-start gap-3 rounded-xl border border-stone-100 bg-white p-4 ${className}`}>{content}</div>
}
