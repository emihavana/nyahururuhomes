import { useCallback, useEffect, useState } from 'react'
import { apiRequest } from '../lib/api'

const CHANGE_EVENT = 'nyahururu-homes-properties-changed'

export default function useProperties() {
  const [properties, setProperties] = useState([])
  const [loading, setLoading] = useState(true)
  const [storageError, setStorageError] = useState('')

  const refresh = useCallback(async () => {
    try {
      const result = await apiRequest('/properties')
      setProperties(result.properties)
      setStorageError('')
      return true
    } catch (error) {
      setStorageError(error.message)
      return false
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    refresh()
    window.addEventListener(CHANGE_EVENT, refresh)
    return () => window.removeEventListener(CHANGE_EVENT, refresh)
  }, [refresh])

  const createProperty = useCallback(async (values) => {
    try {
      const result = await apiRequest('/properties', { method: 'POST', body: JSON.stringify(values) })
      setProperties((current) => [result.property, ...current])
      setStorageError('')
      window.dispatchEvent(new Event(CHANGE_EVENT))
      return true
    } catch (error) {
      setStorageError(error.message)
      return false
    }
  }, [])

  const updateProperty = useCallback(async (id, values) => {
    try {
      const result = await apiRequest(`/properties/${encodeURIComponent(id)}`, { method: 'PUT', body: JSON.stringify(values) })
      setProperties((current) => current.map((property) => property.id === id ? result.property : property))
      setStorageError('')
      window.dispatchEvent(new Event(CHANGE_EVENT))
      return true
    } catch (error) {
      setStorageError(error.message)
      return false
    }
  }, [])

  const deleteProperty = useCallback(async (id) => {
    try {
      await apiRequest(`/properties/${encodeURIComponent(id)}`, { method: 'DELETE', body: '{}' })
      setProperties((current) => current.filter((property) => property.id !== id))
      setStorageError('')
      window.dispatchEvent(new Event(CHANGE_EVENT))
      return true
    } catch (error) {
      setStorageError(error.message)
      return false
    }
  }, [])

  return { properties, loading, refresh, createProperty, updateProperty, deleteProperty, storageError }
}
