import { useCallback, useEffect, useState } from 'react'
import { apiRequest } from '../lib/api'

export default function useAdminAuth() {
  const [auth, setAuth] = useState({ loading: true, authenticated: false, email: '', error: '' })

  const refresh = useCallback(async () => {
    try {
      const result = await apiRequest('/auth/me')
      setAuth({ loading: false, authenticated: result.authenticated, email: result.email || '', error: '' })
    } catch (error) {
      setAuth({ loading: false, authenticated: false, email: '', error: error.message })
    }
  }, [])

  useEffect(() => { refresh() }, [refresh])

  const signIn = useCallback(async (email, password) => {
    try {
      const result = await apiRequest('/auth/login', { method: 'POST', body: JSON.stringify({ email, password }) })
      setAuth({ loading: false, authenticated: true, email: result.email, error: '' })
      return true
    } catch (error) {
      setAuth((current) => ({ ...current, error: error.message }))
      return false
    }
  }, [])

  const signOut = useCallback(async () => {
    try {
      await apiRequest('/auth/logout', { method: 'POST', body: '{}' })
      setAuth({ loading: false, authenticated: false, email: '', error: '' })
      return true
    } catch (error) {
      setAuth((current) => ({ ...current, error: error.message }))
      return false
    }
  }, [])

  return { ...auth, signIn, signOut, refresh }
}
