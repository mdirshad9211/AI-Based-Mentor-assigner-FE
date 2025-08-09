// API Configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://ai-based-mentor-assigner-be.vercel.app';

export const API_ENDPOINTS = {
  // Auth endpoints
  SIGNUP: `${API_BASE_URL}/api/auth/signup`,
  LOGIN: `${API_BASE_URL}/api/auth/login`,
  LOGOUT: `${API_BASE_URL}/api/auth/logout`,
  USERS: `${API_BASE_URL}/api/auth/users`,
  MODERATORS: `${API_BASE_URL}/api/auth/moderators`,
  
  // Ticket endpoints
  TICKETS: `${API_BASE_URL}/api/tickets`,
  TICKETS_ADMIN_ALL: `${API_BASE_URL}/api/tickets/admin/all`,
  TICKETS_BULK_AUTO_ASSIGN: `${API_BASE_URL}/api/tickets/admin/bulk-auto-assign`,
  
  // Dynamic endpoints (functions)
  TICKET_BY_ID: (id) => `${API_BASE_URL}/api/tickets/${id}`,
  TICKET_ASSIGN: (id) => `${API_BASE_URL}/api/tickets/${id}/assign`,
  TICKET_REPLY: (id) => `${API_BASE_URL}/api/tickets/${id}/reply`,
  TICKET_FEEDBACK: (id) => `${API_BASE_URL}/api/tickets/${id}/feedback`,
};

export default API_BASE_URL;
