import apiClient from "./client";
import { API_ENDPOINTS } from "../utils/constants";

/**
 * Get parent dashboard data
 * @returns {Promise<Object>} Dashboard statistics and recent activities
 */
export const getParentDashboard = async () => {
  return apiClient.get(API_ENDPOINTS.DASHBOARD.PARENT);
};

/**
 * Get specialist (Doctor/Therapist) dashboard data
 * @returns {Promise<Object>} Dashboard statistics and patients overview
 */
export const getSpecialistDashboard = async () => {
  return apiClient.get(API_ENDPOINTS.DASHBOARD.SPECIALIST);
};
