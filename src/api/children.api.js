import apiClient from "./client";
import { API_ENDPOINTS } from "../utils/constants";

/**
 * Get all children for the current parent
 * @returns {Promise<Array>} List of children
 */
export const getChildren = async () => {
  return apiClient.get(API_ENDPOINTS.CHILDREN.BASE);
};

/**
 * Get child details by ID
 * @param {number|string} id 
 * @returns {Promise<Object>} Child details
 */
export const getChildById = async (id) => {
  return apiClient.get(API_ENDPOINTS.CHILDREN.BY_ID(id));
};

/**
 * Create a new child profile
 * @param {Object} childData 
 * @returns {Promise<Object>} Created child
 */
export const createChild = async (childData) => {
  return apiClient.post(API_ENDPOINTS.CHILDREN.BASE, childData);
};

/**
 * Update child profile
 * @param {number|string} id 
 * @param {Object} childData 
 * @returns {Promise<Object>} Updated child
 */
export const updateChild = async (id, childData) => {
  return apiClient.put(API_ENDPOINTS.CHILDREN.BY_ID(id), childData);
};

/**
 * Delete child profile
 * @param {number|string} id 
 * @returns {Promise}
 */
export const deleteChild = async (id) => {
  return apiClient.delete(API_ENDPOINTS.CHILDREN.BY_ID(id));
};
