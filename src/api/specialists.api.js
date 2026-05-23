import apiClient from "./client";
import { API_ENDPOINTS } from "../utils/constants";

/**
 * Get list of specialists with optional pagination
 * @param {number} pageNumber 
 * @param {number} pageSize 
 * @returns {Promise<Array>} List of specialists
 */
export const getSpecialists = async (pageNumber = 1, pageSize = 10) => {
  return apiClient.get(API_ENDPOINTS.SPECIALISTS.BASE, {
    params: { PageNumber: pageNumber, PageSize: pageSize },
  });
};

/**
 * Get specialist details by ID
 * @param {number|string} id 
 * @returns {Promise<Object>} Specialist details
 */
export const getSpecialistById = async (id) => {
  return apiClient.get(API_ENDPOINTS.SPECIALISTS.BY_ID(id));
};
