/**
 * App Configuration
 * Environment variables and application constants
 */

/**
 * Sanitize the API base URL:
 * - Strip any trailing slash
 * - Strip any trailing /api suffix
 * This ensures the URL works whether the env var was set as
 * "https://auticare-production.up.railway.app" OR
 * "https://auticare-production.up.railway.app/api"
 */
function sanitizeBaseUrl(url) {
  // Remove trailing slash first
  let sanitized = url.replace(/\/$/, '')
  // Remove trailing /api (case-insensitive) so endpoints like /api/auth/login don't double up
  sanitized = sanitized.replace(/\/api$/i, '')
  return sanitized
}

const rawBaseUrl = import.meta.env.VITE_API_BASE_URL || 'https://auticare-production-828c.up.railway.app'

export const config = {
  // API base URL — always sanitized to strip trailing /api or /
  apiBaseUrl: sanitizeBaseUrl(rawBaseUrl),

  // AI API URL (HuggingFace space)
  aiApiUrl: import.meta.env.VITE_AI_API_URL || 'https://moaz2545-gradpro.hf.space/predict/all',
  
  apiTimeout: parseInt(import.meta.env.VITE_API_TIMEOUT || '30000'),
  appName: import.meta.env.VITE_APP_NAME || 'AutiCare',
  appVersion: import.meta.env.VITE_APP_VERSION || '1.0.0',
  
  features: {
    enableRealTime: import.meta.env.VITE_ENABLE_REAL_TIME === 'true',
    enableNotifications: import.meta.env.VITE_ENABLE_NOTIFICATIONS !== 'false',
    enableDarkMode: import.meta.env.VITE_ENABLE_DARK_MODE === 'true',
  },
  
  // Pagination
  defaultPageSize: 10,
  maxPageSize: 100,
  
  // File upload limits
  maxFileSize: 5 * 1024 * 1024, // 5MB
  allowedFileTypes: ['image/jpeg', 'image/png', 'image/jpg', 'application/pdf'],
  
  // Session timeout (in milliseconds)
  sessionTimeout: 30 * 60 * 1000, // 30 minutes
};

export default config;
