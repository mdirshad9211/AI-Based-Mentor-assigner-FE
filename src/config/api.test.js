// Test API Configuration
import { API_ENDPOINTS } from './api.js';

console.log('API Configuration Test:');
console.log('Base URL:', import.meta.env.VITE_API_URL);
console.log('Signup Endpoint:', API_ENDPOINTS.SIGNUP);
console.log('Login Endpoint:', API_ENDPOINTS.LOGIN);
console.log('Tickets Endpoint:', API_ENDPOINTS.TICKETS);
console.log('Dynamic Ticket By ID (123):', API_ENDPOINTS.TICKET_BY_ID('123'));

export default {};
