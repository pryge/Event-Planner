import z from "zod";

export const importanceSchema = z.enum(['LOW','MEDIUM','HIGH',]);

export const eventSchema = z.object({
  id: z.string(),
  title: z.string().min(1, 'Name requaired'),
  description: z.string().optional(),
  date: z.string(),
  importance: importanceSchema,
  userId: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const createEventSchema = eventSchema.pick({
  title: true,
  description: true,
  date: true,
  importance: true,
}).extend({
  description: z.string().optional().nullable(),
});

export type Event = z.infer<typeof eventSchema>;
export type CreateEventInput = z.infer<typeof createEventSchema>
export type importance = z.infer<typeof importanceSchema>