import z from "zod";
import { CategorySchema } from "~/features/category/types/category";
import { zodDate } from "~/schemas/zodHelper";

export const TransactionSchema = z.object({
	id: z.uuidv4().optional().nullable(),
	item: z.string().nonempty("Description is required"),
	amount: z.int().nonnegative("Amount must be a positive number"),
	date: z.date().optional(),
	// month: z.uuidv4().optional(),
	paymentMethod: z.string().optional(),
	isRecurring: z.boolean().optional(),
	category: CategorySchema,
	createdAt: zodDate.optional().nullable(),
	updatedAt: zodDate.optional().nullable(),
});

export type Transaction = z.infer<typeof TransactionSchema>;
