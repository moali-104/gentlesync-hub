// User roles
export const USER_ROLES = {
  DOCTOR: 'Doctor',
  THERAPIST: 'Therapist',
  PARENT: 'Parent',
}

// Activity status
export const ACTIVITY_STATUS = {
  PENDING: 'pending',
  IN_PROGRESS: 'in_progress',
  COMPLETED: 'completed',
  REFUSED: 'refused',
  SKIPPED: 'skipped',
}

// Therapy types
export const THERAPY_TYPES = {
  SPEECH: 'speech',
  BEHAVIORAL: 'behavioral',
  OCCUPATIONAL: 'occupational',
  PHYSICAL: 'physical',
  SOCIAL: 'social',
}

// Feedback types
export const FEEDBACK_TYPES = {
  POSITIVE: 'positive',
  NEUTRAL: 'neutral',
  NEGATIVE: 'negative',
  REFUSED: 'refused',
}

// Screening frequency
export const SCREENING_FREQUENCY = {
  BASELINE: 'baseline',
  THREE_MONTHS: '3_months',
  SIX_MONTHS: '6_months',
  ANNUAL: 'annual',
}

// Notification types
export const NOTIFICATION_TYPES = {
  MESSAGE: 'message',
  PLAN_UPDATE: 'plan_update',
  FEEDBACK_ALERT: 'feedback_alert',
  SESSION_REMINDER: 'session_reminder',
  REPORT_READY: 'report_ready',
}

// Chart types
export const CHART_TYPES = {
  LINE: 'line',
  BAR: 'bar',
  PIE: 'pie',
  AREA: 'area',
  RADAR: 'radar',
}

// Date formats
export const DATE_FORMATS = {
  DISPLAY: 'MMM dd, yyyy',
  FULL: 'MMMM dd, yyyy',
  SHORT: 'MM/dd/yyyy',
  TIME: 'hh:mm a',
  DATETIME: 'MMM dd, yyyy hh:mm a',
}

// API endpoints
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/api/auth/login',
    REGISTER: '/api/auth/register',
    LOGOUT: '/api/auth/logout',
    FORGOT_PASSWORD: '/api/auth/forgot-password',
    RESET_PASSWORD: '/api/auth/reset-password',
  },
  PROFILE: {
    UPDATE: '/api/profile/update',
    PICTURE: '/api/profile/picture',
    LICENSE: '/api/profile/license',
  },
  CHILDREN: {
    BASE: '/api/children',
    BY_ID: (id) => `/api/children/${id}`,
  },
  SCREENING: {
    START: '/api/screening/start',
    QUESTIONS: '/api/screening/questions',
    SUBMIT: '/api/screening/submit',
    RESULTS: (childId) => `/api/screening/results/${childId}`,
    ANALYTICS: (childId) => `/api/screening/analytics/${childId}`,
  },
  BOOKINGS: {
    BASE: '/api/bookings',
    MY_BOOKINGS: '/api/bookings/my-bookings',
    UPCOMING: '/api/bookings/upcoming',
    STATUS: (id) => `/api/bookings/${id}/status`,
  },
  DASHBOARD: {
    PARENT: '/api/dashboard/parent',
    SPECIALIST: '/api/dashboard/specialist',
  },
  NOTES: {
    BASE: '/api/notes',
    MY_NOTES: '/api/notes/my-notes',
    BY_CHILD: (childId) => `/api/notes/child/${childId}`,
    BY_ID: (id) => `/api/notes/${id}`,
  },
  SESSIONS: {
    BASE: '/api/sessions',
    BY_TREATMENT: (treatmentId) => `/api/sessions/treatment/${treatmentId}`,
  },
  SPECIALISTS: {
    BASE: '/api/specialists',
    BY_ID: (id) => `/api/specialists/${id}`,
  },
  TREATMENT_PLANS: {
    BASE: '/api/treatment-plans',
    BY_CHILD: (childId) => `/api/treatment-plans/child/${childId}`,
    MY_PLANS: '/api/treatment-plans/my-plans',
  },
  CHAT: {
    START: '/api/chat/start',
    MY_CHATS: '/api/chat/my-chats',
    MESSAGES: (chatId) => `/api/chat/${chatId}/messages`,
  },
  NOTIFICATIONS: {
    BASE: '/api/notifications',
    READ: (id) => `/api/notifications/${id}/read`,
    READ_ALL: '/api/notifications/read-all',
  },
}

// Local storage keys
export const STORAGE_KEYS = {
  AUTH_TOKEN: 'auticare_auth_token',
  USER_DATA: 'auticare_user_data',
  THEME: 'auticare_theme',
  LANGUAGE: 'auticare_language',
  SCREENING_RESULT: 'auticare_screening_result',
}

// Validation rules
export const VALIDATION = {
  PASSWORD_MIN_LENGTH: 8,
  USERNAME_MIN_LENGTH: 3,
  MAX_TEXT_LENGTH: 500,
  MAX_NOTE_LENGTH: 2000,
}
