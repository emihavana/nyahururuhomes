export default function SectionHeading({ eyebrow, title, description, centered = false }) {
  return (
    <div className={`${centered ? 'mx-auto text-center' : ''} mb-10 max-w-2xl`}>
      {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
      <h2 className="font-heading text-3xl font-bold leading-tight text-ink sm:text-4xl">{title}</h2>
      {description && <p className="mt-4 text-base leading-7 text-stone-600">{description}</p>}
    </div>
  )
}
