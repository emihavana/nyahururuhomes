const defaultApiBase = 'https://maziwa.emitechsolutions.co.ke/api/index.php/api'
const API_BASE = (import.meta.env.VITE_API_BASE_URL || defaultApiBase).replace(/\/$/, '')
let csrfToken = ''

export class ApiError extends Error {
  constructor(message, status = 0) {
    super(message)
    this.name = 'ApiError'
    this.status = status
  }
}

export function propertyImageUrl(image) {
  return image.startsWith('/') ? new URL(image, API_BASE).toString() : image
}

export async function apiRequest(path, options = {}) {
  const method = (options.method || 'GET').toUpperCase()
  const headers = { Accept: 'application/json', ...(options.headers || {}) }
  const isFormData = typeof FormData !== 'undefined' && options.body instanceof FormData
  if (options.body !== undefined && !isFormData) headers['Content-Type'] = 'application/json'
  if (isFormData) delete headers['Content-Type']
  if (!['GET', 'HEAD', 'OPTIONS'].includes(method) && csrfToken) headers['X-CSRF-Token'] = csrfToken

  let response
  try {
    response = await fetch(`${API_BASE}${path}`, {
      ...options,
      method,
      headers,
      credentials: 'include'
    })
  } catch {
    throw new ApiError(`Could not reach the PHP API at ${API_BASE}. Start the backend and check its URL configuration.`)
  }

  let result
  try {
    result = await response.json()
  } catch {
    throw new ApiError('The API returned an invalid response.', response.status)
  }
  if (!response.ok) {
    if (response.status === 403 && method !== 'GET') csrfToken = ''
    throw new ApiError(result.error || 'The request could not be completed.', response.status)
  }
  if (result.csrfToken) csrfToken = result.csrfToken
  if (path === '/auth/logout') csrfToken = ''
  return result
}

export async function uploadPropertyImage(file) {
  const body = new FormData()
  body.append('image', file)
  const result = await apiRequest('/uploads', { method: 'POST', body })
  return result.image
}
