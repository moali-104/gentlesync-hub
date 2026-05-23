import apiClient from "./client";
import { API_ENDPOINTS } from "../utils/constants";

/**
 * Login with email and password
 * @param {string} email
 * @param {string} password
 * @returns {Promise} User data
 */
export const login = async (email, password) => {
  const response = await apiClient.post(API_ENDPOINTS.AUTH.LOGIN, { email, password });
  return response;
};

/**
 * Register new user
 * @param {Object} userData
 * @returns {Promise} User data
 */
export const register = async (userData) => {
  return apiClient.post(API_ENDPOINTS.AUTH.REGISTER, userData);
};

/**
 * Logout current user
 * @returns {Promise}
 */
export const logout = async () => {
  return apiClient.post(API_ENDPOINTS.AUTH.LOGOUT);
};
