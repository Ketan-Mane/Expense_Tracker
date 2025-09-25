import z from "zod";

export const UserSchema = z.object({
	id: z.uuidv4(),
	name: z.string().min(2).max(100),
	email: z.email(),
	createdAt: z.string().refine((date) => !isNaN(Date.parse(date)), { message: "Invalid date format" }),
	updatedAt: z.string().refine((date) => !isNaN(Date.parse(date)), { message: "Invalid date format" }),
});

export type User = z.infer<typeof UserSchema>;