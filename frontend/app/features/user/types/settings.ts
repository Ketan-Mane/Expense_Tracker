import { z } from 'zod';

export const settingsSchema = z.object({
	defaultPaymentMethod: z.string().optional(),
	defaultCurrency: z.string().optional(),
	financialMonthStart: z.number().min(1).max(31).optional(),
	financialMonthEnd: z.number().min(1).max(31).optional(),
	weeklyStartDay: z.enum(['Sunday', 'Monday']).optional(),
	monthlyBudgetLimit: z.number().min(0).optional(),
	budgetNotificationsEnabled: z.boolean().optional(),
	transactionReminders: z.boolean().optional(),
	favoriteCategories: z.array(z.string()).optional(),
	defaultView: z.enum(['list', 'calendar', 'chart']).optional(),
	recurringTransactionFrequency: z.enum(['daily', 'weekly', 'monthly']).optional(),
	recurringTransactionDefaultCategory: z.string().optional(),
});

export type SettingsFormData = z.infer<typeof settingsSchema>;
