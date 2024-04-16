import { z } from "zod";

const loginForm = z.object({
  email: z.string().email().min(1, "The email field is required").max(256, "You reached the maximum number of characters"),
  password: z.string().min(8, "The password is at least 8 characters long").max(64, "You reached the maximum number of characters"),
});

export default loginForm;
