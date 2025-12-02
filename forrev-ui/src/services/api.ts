import axios from 'axios';
import type { Event } from '../types/event';

const API_BASE_URL = 'http://127.0.0.1:8000';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  xsrfCookieName: 'csrftoken',
  xsrfHeaderName: 'HTTP_X_CSRFTOKEN',
});
axios.defaults.withCredentials = true;
axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'HTTP_X_CSRFTOKEN';

// // ADD THIS FUNCTION HERE ↓
// function getCookie(name: string): string | null {
//   const value = `; ${document.cookie}`;
//   const parts = value.split(`; ${name}=`);
//   if (parts.length === 2) {
//     const popped = parts.pop();
//     if (popped) {
//       return popped.split(';').shift() || null;
//     }
//   }
//   return null;
// }

// api.interceptors.request.use((config) => {
//   const csrfToken = getCookie('csrftoken');
//   if (csrfToken && config.headers) {
//     config.headers['X-CSRFToken'] = csrfToken;
//   }
//   return config;
// });

export interface EventFormData {
  title: string;
  description: string;
  location: string;
  start_time: string;
  end_time: string;
}


// Events API - Read Only
export const eventsApi = {
  // Get all events
  getAll: async (): Promise<Event[]> => {
    const response = await api.get('/events/');
    return response.data;
  },

  // Get single event by ID
  getById: async (id: number): Promise<Event> => {
    const response = await api.get(`/events/${id}/`);
    return response.data;
  },
  
  create: async (eventData: EventFormData): Promise<Event> => {
    console.log('🎉 Attempting to create event...');
    console.log('🍪 Cookies:', document.cookie);
    console.log('📝 Event data:', eventData);
    
    const response = await api.post('/events/', eventData);
    
    console.log('✅ Create response:', response.data);
    return response.data;
  },

  update: async (id: number, eventData: EventFormData): Promise<Event> => {
    const response = await api.put(`/events/${id}/`, eventData);
    return response.data;
  },
  
};

export const getCSRFToken = async () => {
  const response = await api.get('/auth/csrf/');
  return response.data;
};

export const login = async (username: string, password: string) => {
  await api.get('/auth/csrf/');
  await new Promise(resolve => setTimeout(resolve, 100));
  const response = await api.post('/auth/login/',{ username, password });
  return response.data;
};

export default api;