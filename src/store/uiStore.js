import { create } from 'zustand'
import { toast as sonnerToast } from 'sonner'


const THEME_STORAGE_KEY = 'auticare-theme'

/**
 * UI Store
 * Manages global UI state like modals, notifications, sidebar, theme
 */
export const useUIStore = create((set) => ({
  // Sidebar state
  isSidebarOpen: true,
  setSidebarOpen: (isOpen) => set({ isSidebarOpen: isOpen }),
  openSidebar: () => set({ isSidebarOpen: true }),
  closeSidebar: () => set({ isSidebarOpen: false }),
  toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
  
  // Modal state
  activeModal: null,
  modalData: null,
  openModal: (modalName, data = null) => set({ activeModal: modalName, modalData: data }),
  closeModal: () => set({ activeModal: null, modalData: null }),
  
  // Notifications
  notifications: [],
  addNotification: (notification) =>
    set((state) => ({
      notifications: [
        {
          id: Date.now(),
          timestamp: new Date(),
          read: false,
          ...notification,
        },
        ...state.notifications,
      ],
    })),
  markAsRead: (id) =>
    set((state) => ({
      notifications: state.notifications.map((n) =>
        n.id === id ? { ...n, read: true } : n
      ),
    })),
  markAllAsRead: () =>
    set((state) => ({
      notifications: state.notifications.map((n) => ({ ...n, read: true })),
    })),
  removeNotification: (id) =>
    set((state) => ({
      notifications: state.notifications.filter((n) => n.id !== id),
    })),
  clearNotifications: () => set({ notifications: [] }),
  
  // Toast messages
  toasts: [],
  addToast: (toast) => {
    const t = { id: Date.now(), type: 'info', duration: 3000, ...toast }
    const msg = t.title || t.message || ''
    const desc = t.title && t.message ? t.message : undefined
    const fn = sonnerToast[t.type] || sonnerToast
    fn(msg, { description: desc, duration: t.duration })
    set((state) => ({ toasts: [t, ...state.toasts] }))
  },
  removeToast: (id) =>
    set((state) => ({
      toasts: state.toasts.filter((t) => t.id !== id),
    })),
  
  // Loading states
  globalLoading: false,
  setGlobalLoading: (loading) => set({ globalLoading: loading }),
  
  // Theme
  theme: 'light',
  initializeTheme: () => {
    const savedTheme = localStorage.getItem(THEME_STORAGE_KEY)
    if (savedTheme === 'light' || savedTheme === 'dark') {
      set({ theme: savedTheme })
    }
  },
  toggleTheme: () =>
    set((state) => {
      const nextTheme = state.theme === 'light' ? 'dark' : 'light'
      localStorage.setItem(THEME_STORAGE_KEY, nextTheme)
      return { theme: nextTheme }
    }),
  setTheme: (theme) => set({ theme }),
}))
