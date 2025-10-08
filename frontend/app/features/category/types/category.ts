import z from "zod";
import { zodDate } from "~/schemas/zodHelper";

export const CategorySchema = z.object({
	id: z.string(),
	userId: z.string().optional().nullable(),
	name: z.string().min(2, "Name must be at least 2 characters").max(100, "Name must be at most 100 characters"),
	color: z.string().optional(),
	isDefault: z.boolean().optional(),
	icon: z.string().optional().nullable(),
	createdAt: zodDate.optional().nullable(),
	updatedAt: zodDate.optional().nullable(),
});

export type Category = z.infer<typeof CategorySchema>;
