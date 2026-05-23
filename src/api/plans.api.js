import apiClient from "./client";
import { API_ENDPOINTS } from "../utils/constants";

/**
 * Get all treatment plans for the current user
 * @returns {Promise<Array>} List of treatment plans
 */
export const getMyTreatmentPlans = async () => {
  return apiClient.get(API_ENDPOINTS.TREATMENT_PLANS.MY_PLANS);
};

/**
 * Get treatment plans for a specific child
 * @param {number|string} childId 
 * @returns {Promise<Array>} List of treatment plans
 */
export const getTreatmentPlansByChild = async (childId) => {
  return apiClient.get(API_ENDPOINTS.TREATMENT_PLANS.BY_CHILD(childId));
};

/**
 * Get treatment plan details by ID
 * @param {number|string} id 
 * @returns {Promise<Object>} Treatment plan details
 */
export const getTreatmentPlanById = async (id) => {
  return apiClient.get(`${API_ENDPOINTS.TREATMENT_PLANS.BASE}/${id}`);
};

/**
 * Create a new treatment plan
 * @param {Object} planData 
 * @returns {Promise<Object>} Created plan
 */
export const createTreatmentPlan = async (planData) => {
  return apiClient.post(API_ENDPOINTS.TREATMENT_PLANS.BASE, planData);
};

/**
 * Update treatment plan
 * @param {number|string} id 
 * @param {Object} planData 
 * @returns {Promise<Object>} Updated plan
 */
export const updateTreatmentPlan = async (id, planData) => {
  return apiClient.put(`${API_ENDPOINTS.TREATMENT_PLANS.BASE}/${id}`, planData);
};

