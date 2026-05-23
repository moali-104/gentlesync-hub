import axios from 'axios'
import { config } from '../config'
import { STORAGE_KEYS } from '../utils/constants'

/**
 * Standard API client for all backend requests
 */
const apiClient = axios.create({
  baseURL: config.apiBaseUrl,
  timeout: config.apiTimeout,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor - add auth token
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN)
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

// Response interceptor - handle global error states
apiClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response) {
      const { status } = error.response
      
      switch (status) {
        case 401: {
          // Unauthorized - clear auth and redirect to login
          // Skip redirect if the failing request was itself an auth endpoint
          // (e.g. wrong credentials on login — let the caller handle the error)
          const requestUrl = error.config?.url || ''
          const isAuthEndpoint = requestUrl.includes('/api/auth/login') || requestUrl.includes('/api/auth/register')
          if (!isAuthEndpoint) {
            localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN)
            localStorage.removeItem(STORAGE_KEYS.USER_DATA)
            if (window.location.pathname !== '/login') {
              window.location.href = '/login'
            }
          }
          break
        }
          
        case 403:
          console.error('Forbidden access')
          break
          
        case 500:
          console.error('Internal server error')
          break
          
        default:
          break
      }
    } else if (error.request) {
      console.error('Network error - no response from server')
    }
    
    return Promise.reject(error)
  }
)

export default apiClient
