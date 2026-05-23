import apiClient from "./client";
import { API_ENDPOINTS } from "../utils/constants";

/**
 * Get all notes for the current user
 * @returns {Promise<Array>} List of notes
 */
export const getNotes = async () => {
  return apiClient.get(API_ENDPOINTS.NOTES.BASE);
};

/**
 * Get notes for a specific child
 * @param {number|string} childId 
 * @returns {Promise<Array>} List of notes
 */
export const getNotesByChild = async (childId) => {
  return apiClient.get(API_ENDPOINTS.NOTES.BY_CHILD(childId));
};

/**
 * Create a new note
 * @param {Object} noteData 
 * @returns {Promise<Object>} Created note
 */
export const createNote = async (noteData) => {
  return apiClient.post(API_ENDPOINTS.NOTES.BASE, noteData);
};

/**
 * Update a note
 * @param {number|string} id 
 * @param {Object} noteData 
 * @returns {Promise<Object>} Updated note
 */
export const updateNote = async (id, noteData) => {
  return apiClient.put(API_ENDPOINTS.NOTES.BY_ID(id), noteData);
};

/**
 * Delete a note
 * @param {number|string} id 
 * @returns {Promise}
 */
export const deleteNote = async (id) => {
  return apiClient.delete(API_ENDPOINTS.NOTES.BY_ID(id));
};
