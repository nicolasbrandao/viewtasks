import { z } from "zod";

const newTasksListForm = z.object({
  title: z.string().min(1, "The title field is required"),
});

export default newTasksListForm;
