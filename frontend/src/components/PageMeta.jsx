import { Helmet } from 'react-helmet-async'
import { agency } from '../config'

export default function PageMeta({ title, description }) {
  return <Helmet><title>{title} | {agency.name}</title><meta name="description" content={description} /></Helmet>
}
