import { z } from "zod";

export const loginSchema = z.object({
    email: z.string().min(1, { message: 'Email is required' }).email({ message: 'Enter a valid email address' }),
    password: z.string().min(6, { message: 'Password must be at least 6 characters long' })
});

export type LoginDataType = z.infer<typeof loginSchema>;

