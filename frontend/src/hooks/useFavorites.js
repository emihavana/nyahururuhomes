import { useState } from 'react'

const STORAGE_KEY = 'nyahururu-homes-favorites'

export default function useFavorites() {
  const [favorites, setFavorites] = useState(() => {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]') }
    catch { return [] }
  })
  const toggleFavorite = (id) => {
    setFavorites((current) => {
      const next = current.includes(id) ? current.filter((favorite) => favorite !== id) : [...current, id]
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
      return next
    })
  }
  return { favorites, toggleFavorite }
}
