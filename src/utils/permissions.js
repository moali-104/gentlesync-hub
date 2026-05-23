/**
 * Permission Utilities
 * Helper functions for role-based access control
 */

import { USER_ROLES } from './constants';

/**
 * Define permissions for each role
 */
const PERMISSIONS = {
  [USER_ROLES.DOCTOR]: {
    canCreateTreatmentPlan: true,
    canEditTreatmentPlan: true,
    canDeleteTreatmentPlan: true,
    canViewAllPatients: true,
    canViewReports: true,
    canPerformScreening: true,
    canAssignTherapist: true,
    canViewAllFeedback: true,
    canMessageTherapists: true,
    canMessageParents: true,
    canExportData: true,
  },
  
  [USER_ROLES.THERAPIST]: {
    canCreateTreatmentPlan: false,
    canEditTreatmentPlan: false,
    canDeleteTreatmentPlan: false,
    canViewAllPatients: false,
    canViewReports: true,
    canPerformScreening: false,
    canAssignTherapist: false,
    canViewAllFeedback: true,
    canCreateSessionNotes: true,
    canEditSessionNotes: true,
    canViewWeeklyPlan: true,
    canProvideGuidance: true,
    canMessageParents: true,
    canMessageDoctors: true,
    canExportData: false,
  },
  
  [USER_ROLES.PARENT]: {
    canCreateTreatmentPlan: false,
    canEditTreatmentPlan: false,
    canDeleteTreatmentPlan: false,
    canViewAllPatients: false,
    canViewReports: false,
    canPerformScreening: false,
    canAssignTherapist: false,
    canViewAllFeedback: false,
    canCreateSessionNotes: false,
    canEditSessionNotes: false,
    canViewWeeklyPlan: true,
    canLogDailyFeedback: true,
    canViewChildProgress: true,
    canAccessResources: true,
    canMessageTherapists: true,
    canViewGuidance: true,
    canExportData: false,
  },
};

/**
 * Check if user has permission
 * @param {string} userRole - User's role
 * @param {string} permission - Permission to check
 * @returns {boolean} Has permission
 */
export const hasPermission = (userRole, permission) => {
  if (!userRole || !PERMISSIONS[userRole]) {
    return false;
  }
  
  return PERMISSIONS[userRole][permission] || false;
};

/**
 * Check if user can access route
 * @param {string} userRole - User's role
 * @param {array} allowedRoles - Array of allowed roles
 * @returns {boolean} Can access route
 */
export const canAccessRoute = (userRole, allowedRoles) => {
  if (!allowedRoles || allowedRoles.length === 0) {
    return true; // No restrictions
  }
  
  return allowedRoles.includes(userRole);
};

/**
 * Get dashboard route based on user role
 * @param {string} userRole - User's role
 * @returns {string} Dashboard route
 */
export const getDashboardRoute = (userRole) => {
  const routes = {
    [USER_ROLES.DOCTOR]: '/doctor/home',
    [USER_ROLES.THERAPIST]: '/therapist/home',
    [USER_ROLES.PARENT]: '/parent/home',
  };
  
  return routes[userRole] || '/';
};

/**
 * Get available navigation items based on role
 * @param {string} userRole - User's role
 * @returns {array} Navigation items
 */
export const getNavigationItems = (userRole) => {
  const navItems = {
    [USER_ROLES.DOCTOR]: [
      { label: 'Home', path: '/doctor/home', icon: 'House' },
      { label: 'Patients', path: '/doctor/patients', icon: 'Users' },
      { label: 'Sessions', path: '/doctor/sessions', icon: 'PlayCircle' },
      { label: 'Profile', path: '/doctor/profile', icon: 'User' },
    ],
    
    [USER_ROLES.THERAPIST]: [
      { label: 'Home', path: '/therapist/home', icon: 'House' },
      { label: 'Patients', path: '/therapist/patients', icon: 'Users' },
      { label: 'Sessions', path: '/therapist/sessions', icon: 'PlayCircle' },
      { label: 'Profile', path: '/therapist/profile', icon: 'User' },
    ],
    
    [USER_ROLES.PARENT]: [
      { label: 'Home', path: '/parent/home', icon: 'House' },
      { label: 'Notes', path: '/parent/notes', icon: 'ClipboardList' },
      { label: 'Sessions', path: '/parent/sessions', icon: 'PlayCircle' },
      { label: 'Re-Test', path: '/parent/retest', icon: 'RotateCcw' },
      { label: 'Profile', path: '/parent/profile', icon: 'User' },
    ],
  };
  
  return navItems[userRole] || [];
};

/**
 * Check if user is admin (doctor)
 * @param {string} userRole - User's role
 * @returns {boolean} Is admin
 */
export const isAdmin = (userRole) => {
  return userRole === USER_ROLES.DOCTOR;
};

/**
 * Check if user can edit resource
 * @param {string} userRole - User's role
 * @param {string} resourceOwnerId - Resource owner's ID
 * @param {string} currentUserId - Current user's ID
 * @returns {boolean} Can edit resource
 */
export const canEditResource = (userRole, resourceOwnerId, currentUserId) => {
  // Admins can edit anything
  if (isAdmin(userRole)) {
    return true;
  }
  
  // Users can edit their own resources
  return resourceOwnerId === currentUserId;
};
