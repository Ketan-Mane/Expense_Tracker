import z from 'zod';
import { CategorySchema } from '~/features/category/types/category';
import { PAYMENT_MODES } from '~/lib/constant';
import { zodDate } from '~/schemas/zodHelper';

export const TransactionSchema = z.object({
	id: z.uuidv4().optional().nullable(),
	item: z.string().nonempty('Description is required'),
	amount: z.int().nonnegative('Amount must be a positive number'),
	date: z.date('Date is required'),
	type: z.enum(['Expense', 'Income']),
	paymentMethod: z.enum(PAYMENT_MODES).optional(),
	isRecurring: z.boolean().default(false),
	isArchived: z.boolean().default(false),
	category: CategorySchema.refine((val) => !val || !!val.id, { message: 'Please select a category' }),
	createdAt: zodDate.optional().nullable(),
	updatedAt: zodDate.optional().nullable(),
});

export type Transaction = z.infer<typeof TransactionSchema>;

export type Filters = {
	search?: string;
	limit?: number;
	page?: number;
	category?: string;
	month?: string;
};
