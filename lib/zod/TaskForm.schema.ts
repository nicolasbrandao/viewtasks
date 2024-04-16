import { z } from "zod";

const taskForm = z.object({
  title: z
    .string()
    .min(1, "The title field is required")
    .max(256, "You reached the maximum number of characters"),
  completed: z.boolean().optional().default(false),
});

export default taskForm;
