import { z } from "zod";

const registerForm = z.object({
  email: z.string().email().min(1, "The email field is required"),
  password: z
    .string()
    .min(8, "The password field must have at least 8 characters")
    .regex(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,}$/,
      "Password must contain at least 1 number, 1 letter, 1 capital letter, and 1 special character",
    ),
});

export default registerForm;
