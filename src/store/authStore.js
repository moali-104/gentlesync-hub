import { create } from "zustand";
import { STORAGE_KEYS } from "../utils/constants";

// Auth store using Zustand
export const useAuthStore = create((set) => ({
  // State
  isAuthenticated: false,
  user: null,
  role: null,
  token: null,
  loading: false,
  error: null,

  // Actions
  login: (authData) => {
    const { token, ...data } = authData;
    // Normalize user data to ensure 'name' field exists
    const userData = {
      ...data,
      name: data.name || data.fullName || data.userName || 'User',
    };
    
    set({
      isAuthenticated: true,
      user: userData,
      role: userData.role,
      token: token,
      loading: false,
      error: null,
    });
    // Persist to localStorage
    if (token) localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, token);
    localStorage.setItem(STORAGE_KEYS.USER_DATA, JSON.stringify(userData));
  },

  logout: () => {
    set({
      isAuthenticated: false,
      user: null,
      role: null,
      token: null,
      loading: false,
      error: null,
    });
    // Clear localStorage
    localStorage.removeItem(STORAGE_KEYS.USER_DATA);
    localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
  },

  setLoading: (loading) => set({ loading }),

  setError: (error) => set({ error }),

  // Initialize from localStorage
  initAuth: () => {
    const userData = localStorage.getItem(STORAGE_KEYS.USER_DATA);
    const token = localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
    if (userData && token) {
      const user = JSON.parse(userData);
      set({
        isAuthenticated: true,
        user,
        role: user.role,
        token,
      });
    }
  },
}));
