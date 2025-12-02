import api from "../http-client";
import type { Event } from "../types/event";

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
    const response = await api.get("/events/");
    return response.data;
  },

  // Get single event by ID
  getById: async (id: number): Promise<Event> => {
    const response = await api.get(`/events/${id}/`);
    return response.data;
  },

  create: async (eventData: EventFormData): Promise<Event> => {
    console.log("🎉 Attempting to create event...");
    console.log("🍪 Cookies:", document.cookie);
    console.log("📝 Event data:", eventData);

    const response = await api.post("/events/", eventData);

    console.log("✅ Create response:", response.data);
    return response.data;
  },

  delete: async(id: number): Promise<void> => {
    await api.delete(`/events/${id}/`);
  },

  update: async (id: number, eventData: EventFormData): Promise<Event> => {
      const response = await api.put(`/events/${id}/`, eventData);
      return response.data;
  },
};