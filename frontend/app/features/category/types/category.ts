import z from "zod";

export const CategorySchema = z.object({
	id: z.string(),
	userId: z.string(),
	name: z.string().min(2, "Name must be at least 2 characters").max(100, "Name must be at most 100 characters"),
	color: z.string().optional(),
	isDefault: z.boolean().optional(),
	icon: z.string().optional(),
	createdAt: z.date().optional(),
	updatedAt: z.date().optional(),
});

export type Category = z.infer<typeof CategorySchema>;
