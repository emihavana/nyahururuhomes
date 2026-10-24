import { Link } from 'react-router-dom'

export default function Button({ children, to, href, variant = 'primary', className = '', ...props }) {
  const styles = variant === 'outline'
    ? 'border border-forest text-forest hover:bg-forest hover:text-white'
    : variant === 'light'
      ? 'bg-white text-forest hover:bg-amber-50'
      : 'bg-forest text-white hover:bg-forest-dark'
  const classes = `inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-bold transition duration-200 ${styles} ${className}`
  if (to) return <Link to={to} className={classes} {...props}>{children}</Link>
  if (href) return <a href={href} className={classes} {...props}>{children}</a>
  return <button className={classes} {...props}>{children}</button>
}
