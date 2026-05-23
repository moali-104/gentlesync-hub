import apiClient from "./client";
import { API_ENDPOINTS } from "../utils/constants";

/**
 * Create a new therapy session
 * @param {Object} sessionData 
 * @returns {Promise<Object>} Created session
 */
export const createSession = async (sessionData) => {
  return apiClient.post(API_ENDPOINTS.SESSIONS.BASE, sessionData);
};

/**
 * Get sessions for a specific treatment plan
 * @param {number|string} treatmentId 
 * @returns {Promise<Array>} List of sessions
 */
export const getSessionsByTreatment = async (treatmentId) => {
  return apiClient.get(API_ENDPOINTS.SESSIONS.BY_TREATMENT(treatmentId));
};

/**
 * Update session details
 * @param {number|string} id 
 * @param {Object} sessionData 
 * @returns {Promise<Object>} Updated session
 */
export const updateSession = async (id, sessionData) => {
  return apiClient.put(`${API_ENDPOINTS.SESSIONS.BASE}/${id}`, sessionData);
};

/**
 * Get my bookings (upcoming/history)
 * @returns {Promise<Array>} List of bookings
 */
export const getMyBookings = async () => {
  return apiClient.get(API_ENDPOINTS.BOOKINGS.MY_BOOKINGS);
};

/**
 * Get upcoming bookings
 * @returns {Promise<Array>} List of upcoming bookings
 */
export const getUpcomingBookings = async () => {
  return apiClient.get(API_ENDPOINTS.BOOKINGS.UPCOMING);
};

/**
 * Update booking status
 * @param {number|string} id 
 * @param {string} status 
 * @returns {Promise}
 */
export const updateBookingStatus = async (id, status) => {
  return apiClient.patch(API_ENDPOINTS.BOOKINGS.STATUS(id), status);
};

/**
 * Cancel a session
 * @param {number|string} id 
 * @returns {Promise}
 */
export const cancelSession = async (id) => {
  return apiClient.patch(API_ENDPOINTS.BOOKINGS.STATUS(id), "Cancelled");
};

/**
 * Send a session note
 * @param {number|string} sessionId 
 * @param {string} note 
 * @returns {Promise}
 */
export const sendSessionNote = async (sessionId, note) => {
  // Assuming a generic notes endpoint or specialist note submission
  return apiClient.post(`${API_ENDPOINTS.SESSIONS.BASE}/${sessionId}/notes`, { note });
};

/**
 * Get sessions for a specific role (parent/doctor/therapist)
 */
export const getSessions = async (role) => {
  // Generic booking list for now as per DTOs
  return apiClient.get(API_ENDPOINTS.BOOKINGS.MY_BOOKINGS);
};

/**
 * Get upcoming sessions for a specific role
 */
export const getUpcomingSessions = async (role) => {
  return apiClient.get(API_ENDPOINTS.BOOKINGS.UPCOMING);
};

/**
 * Get session notes (generic list)
 */
export const getSessionNotes = async () => {
  return apiClient.get(API_ENDPOINTS.NOTES.BASE);
};

/**
 * Get home notes
 */
export const getHomeNotes = async () => {
  return apiClient.get(`${API_ENDPOINTS.NOTES.BASE}/home`);
};

/**
 * Add home note
 */
export const addHomeNote = async (noteData) => {
  return apiClient.post(API_ENDPOINTS.NOTES.BASE, noteData);
};
