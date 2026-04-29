import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CreateEventInput, importance } from "@/entities/event/model/types";
import { eventsApi } from "../api/events.api";

export const useEvents = (importance?: importance, search?: string) => {
  return useQuery({
    queryKey: ['events', { importance, search }],
    queryFn: () => eventsApi.getAll(importance, search),
  });
}

export const useEventActions = () => {
  const queryClient = useQueryClient();
  const createMutation = useMutation({
    mutationFn: eventsApi.create,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['events'] }),
  });
  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<CreateEventInput> }) =>
      eventsApi.update(id, data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['events'] }),
  });
  const deleteMutation = useMutation({
    mutationFn: eventsApi.delete,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['events'] }),
  });
  return {
    createEvent: createMutation.mutate,
    updateEvent: updateMutation.mutate,
    deleteEvent: deleteMutation.mutate,
    isCreating: createMutation.isPending,
    isUpdating: updateMutation.isPending,
    isDeleting: deleteMutation.isPending,
  };
};