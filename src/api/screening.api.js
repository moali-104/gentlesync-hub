import apiClient from "./client";
import { API_ENDPOINTS } from "../utils/constants";

/**
 * Start a new screening session
 * @param {Object} data { childId }
 * @returns {Promise<Object>} Screening session info
 */
export const startScreening = async (data) => {
  return apiClient.post(API_ENDPOINTS.SCREENING.START, data);
};

/**
 * Get screening questions
 * @returns {Promise<Array>} List of questions
 */
export const getScreeningQuestions = async () => {
  return apiClient.get(API_ENDPOINTS.SCREENING.QUESTIONS);
};

/**
 * Submit screening answers
 * @param {Object} data { childId, answers: [{ questionId, answerValue }] }
 * @returns {Promise<Object>} Screening result
 */
export const submitScreening = async (data) => {
  return apiClient.post(API_ENDPOINTS.SCREENING.SUBMIT, data);
};

/**
 * Get screening results for a child
 * @param {number|string} childId 
 * @returns {Promise<Array>} History of results
 */
export const getScreeningResults = async (childId) => {
  return apiClient.get(API_ENDPOINTS.SCREENING.RESULTS(childId));
};

/**
 * Get screening analytics for a child
 * @param {number|string} childId 
 * @returns {Promise<Object>} Analytics data
 */
export const getScreeningAnalytics = async (childId) => {
  return apiClient.get(API_ENDPOINTS.SCREENING.ANALYTICS(childId));
};
