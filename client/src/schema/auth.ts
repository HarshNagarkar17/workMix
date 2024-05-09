import { z } from "zod";

export const registerSchema = () =>
  z.object({
    username:z.string().refine((data) => data.trim() !== "", {message:"username is required"}),
    email: z.string().email({ message: "Invalid email format" }),
    password: z.string().min(6, { message: "Password must be at least 6 characters long" }).regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/, { message: "Weak Password!!" }),
  });

  export const loginSchema = () =>
    z.object({
      email: z.string().email({ message: "Invalid email format" }),
      password: z.string().min(6, { message: "Password must be at least 6 characters long" }).regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/, { message: "Weak Password!!" }),
    });