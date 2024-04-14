import { z } from "zod";

const editTaskForm = z.object({
  title: z.string().min(1, "The title field is required"),
});

export default editTaskForm;
