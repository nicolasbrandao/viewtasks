import { z } from "zod";

const editTaskForm = z.object({
  title: z.string().min(1, "The title field is required").max(256, "You reached the maximum number of characters"),
});

export default editTaskForm;
