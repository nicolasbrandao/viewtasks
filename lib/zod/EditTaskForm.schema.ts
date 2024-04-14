import { z } from "zod";

const editTaskForm = z.object({
  title: z.string().min(1, "The title field is required"),
  completed: z.boolean().default(false),
});

export default editTaskForm;
