import { z } from "zod"

// Define the validation schema using Zod
export const loginSchema = z.object({
    email: z.string().min(1, { message: "email is required" }),
    password: z.string().min(1, { message: "Password is required" }),
  })
  
  export const registerSchema = z.object({
    email: z.string().email({ message: "Invalid email format" }),
    password: z.string().min(6, { message: "Password must be at least 6 characters" }),
  })

  
// Infer the type from the schema
export type LoginFormData = z.infer<typeof loginSchema>
export type RegisterFormData = z.infer<typeof registerSchema>
