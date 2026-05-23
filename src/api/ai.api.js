import axios from 'axios';
import { config } from '../config';

const AI_API_URL = config.aiApiUrl;

/**
 * Predict ASD risk using the HuggingFace AI model
 * @param {Object} data - Formatted data for the model
 * @returns {Promise<Object>} Prediction result
 */
export const predictASD = async (data) => {
  try {
    const response = await axios.post(AI_API_URL, data);
    return response.data;
  } catch (error) {
    console.error('AI Prediction error:', error);
    throw new Error('Failed to get prediction from AI model.');
  }
};

/**
 * Format screening answers for the AI model
 * @param {Object} profile - Child profile (name, age, gender, etc.)
 * @param {Object} answers - Screening answers
 * @param {Array} questions - Question definitions
 * @returns {Object} Formatted payload
 */
export const formatForAI = (profile, answers, questions) => {
  const payload = {};
  
  questions.forEach((q, index) => {
    const key = `A${index + 1}_Score`;
    const answer = answers[q.id];
    payload[key] = q.riskAnswers.includes(answer) ? 1 : 0;
  });

  payload.age = parseInt(profile.age) || 4;
  payload.gender = profile.gender === 'male' ? 'm' : 'f';
  payload.ethnicity = 'others'; // Default
  payload.Jauundice = 'no'; // Default as required by backend README
  payload.austim = 'no'; // Default
  payload.contry_of_res = 'Egypt'; // Default
  payload.used_app_before = 'no';
  payload.result = Object.values(payload).filter(v => v === 1).length;
  payload.age_desc = '4-11 years';
  payload.relation = profile.helper === 'parent' ? 'Parent' : 'Others';
  
  return payload;
};
