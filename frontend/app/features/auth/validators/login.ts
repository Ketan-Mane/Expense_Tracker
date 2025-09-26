import { z } from "zod";

export const LoginSchema = z.object({
	email: z.email("Enter valid email").trim(),
	password: z.string().min(6, "Password must be at least 6 characters").trim(),
});

export type LoginForm = z.infer<typeof LoginSchema>;
