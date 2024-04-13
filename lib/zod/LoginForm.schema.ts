import { z } from "zod";

const loginForm = z.object({
  email: z.string().email().min(1, "The email field is required"),
  password: z.string().min(1, "The password field is required"),
});

export default loginForm;
