import { api } from "@/lib/axios";
import { CreateEventInput, importance, Event } from "../types/events.types";

export const eventsApi = {
  getAll: (importance?: importance, search?: string) =>
    api
      .get<Event[]>("/events", {
        params: { importance, search },
      })
      .then((r) => r.data),

  getOne: (id: string) => api.get<Event>(`/events/${id}`).then((r) => r.data),

  create: (data: CreateEventInput) =>
    api.post<Event>("/events", data).then((r) => r.data),

  update: (id: string, data: Partial<CreateEventInput>) =>
    api.patch<Event>(`/events/${id}`, data).then((r) => r.data),

  delete: (id: string) => api.delete(`/events/${id}`).then((r) => r.data),
};
