/**
 * Feedback API
 * API functions for daily feedback and therapy notes
 */

import apiClient from './client';

/**
 * Submit daily feedback (Parent)
 * @param {object} feedbackData - Feedback data
 * @returns {Promise} Created feedback entry
 */
export const submitDailyFeedback = async (feedbackData) => {
  const response = await apiClient.post('/feedback/daily', feedbackData);
  return response.data;
};

/**
 * Get feedback for activity
 * @param {string} activityId - Activity ID
 * @returns {Promise} Feedback entries
 */
export const getFeedbackByActivity = async (activityId) => {
  const response = await apiClient.get(`/feedback/activity/${activityId}`);
  return response.data;
};

/**
 * Get feedback for child
 * @param {string} childId - Child ID
 * @param {object} params - Query params (startDate, endDate, etc.)
 * @returns {Promise} Feedback entries
 */
export const getFeedbackByChild = async (childId, params = {}) => {
  const response = await apiClient.get(`/feedback/child/${childId}`, { params });
  return response.data;
};

/**
 * Update feedback entry
 * @param {string} feedbackId - Feedback ID
 * @param {object} updates - Feedback updates
 * @returns {Promise} Updated feedback
 */
export const updateFeedback = async (feedbackId, updates) => {
  const response = await apiClient.put(`/feedback/${feedbackId}`, updates);
  return response.data;
};

/**
 * Delete feedback entry
 * @param {string} feedbackId - Feedback ID
 * @returns {Promise} Response
 */
export const deleteFeedback = async (feedbackId) => {
  const response = await apiClient.delete(`/feedback/${feedbackId}`);
  return response.data;
};

/**
 * Submit therapy session note (Therapist)
 * @param {object} noteData - Session note data
 * @returns {Promise} Created session note
 */
export const submitSessionNote = async (noteData) => {
  const response = await apiClient.post('/feedback/session-notes', noteData);
  return response.data;
};

/**
 * Get session notes for child
 * @param {string} childId - Child ID
 * @param {object} params - Query params
 * @returns {Promise} Session notes
 */
export const getSessionNotes = async (childId, params = {}) => {
  const response = await apiClient.get(`/feedback/session-notes/${childId}`, { params });
  return response.data;
};

/**
 * Update session note
 * @param {string} noteId - Note ID
 * @param {object} updates - Note updates
 * @returns {Promise} Updated note
 */
export const updateSessionNote = async (noteId, updates) => {
  const response = await apiClient.put(`/feedback/session-notes/${noteId}`, updates);
  return response.data;
};

/**
 * Get parent guidance from therapist
 * @param {string} childId - Child ID
 * @returns {Promise} Guidance entries
 */
export const getParentGuidance = async (childId) => {
  const response = await apiClient.get(`/feedback/guidance/${childId}`);
  return response.data;
};

// ==============================================
// MOCK DATA FOR DEVELOPMENT
// ==============================================

/**
 * Mock feedback data
 */
export const mockGetFeedback = async (childId) => {
  await new Promise(resolve => setTimeout(resolve, 600));
  
  return [
    {
      id: 'fb-1',
      activityId: 'act-1',
      activityTitle: 'Picture Card Identification',
      childId,
      date: '2024-01-15',
      status: 'completed',
      duration: 15,
      notes: 'Child responded well to the activity. Identified 4 out of 5 cards correctly.',
      childResponse: 'Engaged and attentive',
      challenges: 'Struggled with the animal card',
      submittedBy: 'parent-1',
      submittedAt: '2024-01-15T10:30:00Z',
    },
    {
      id: 'fb-2',
      activityId: 'act-2',
      activityTitle: 'Turn-Taking Game',
      childId,
      date: '2024-01-15',
      status: 'refused',
      duration: 5,
      notes: 'Child became frustrated after first turn and refused to continue.',
      childResponse: 'Upset, wanted to play alone',
      challenges: 'Difficulty waiting for turn',
      submittedBy: 'parent-1',
      submittedAt: '2024-01-15T15:45:00Z',
    },
  ];
};

/**
 * Mock session notes
 */
export const mockGetSessionNotes = async (childId) => {
  await new Promise(resolve => setTimeout(resolve, 600));
  
  return [
    {
      id: 'note-1',
      childId,
      therapistId: 'therapist-1',
      therapistName: 'Emily Martinez',
      sessionDate: '2024-01-15',
      therapyType: 'speech',
      observations: 'Child showed improvement in pronunciation. Responded to 80% of prompts correctly.',
      progress: 'Good progress on vowel sounds. Still working on consonant blends.',
      recommendations: 'Continue with picture cards. Introduce new words gradually.',
      parentGuidance: 'Practice 10 minutes daily with picture flashcards. Focus on animals and food items.',
      nextSteps: 'Move to 3-word phrases next week if progress continues.',
      createdAt: '2024-01-15T16:00:00Z',
    },
  ];
};
