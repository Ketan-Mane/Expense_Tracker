import { body } from "express-validator";

export const validator = [
	body("defaultPaymentMethod").optional().isString().withMessage("defaultPaymentMethod must be a string"),

	body("defaultCurrency").optional().isString().withMessage("defaultCurrency must be a string"),

	body("financialMonthStart")
		.optional()
		.isInt({ min: 1, max: 31 })
		.withMessage("financialMonthStart must be an integer between 1 and 31"),

	body("financialMonthEnd")
		.optional()
		.isInt({ min: 1, max: 31 })
		.withMessage("financialMonthEnd must be an integer between 1 and 31"),

	body("weeklyStartDay")
		.optional()
		.isIn(["Sunday", "Monday"])
		.withMessage("weeklyStartDay must be either 'Sunday' or 'Monday'"),

	body("monthlyBudgetLimit")
		.optional()
		.isFloat({ min: 0 })
		.withMessage("monthlyBudgetLimit must be a positive number"),

	body("budgetNotificationsEnabled").optional().isBoolean().withMessage("budgetNotificationsEnabled must be boolean"),

	body("transactionReminders").optional().isBoolean().withMessage("transactionReminders must be boolean"),

	body("favoriteCategories").optional().isArray().withMessage("favoriteCategories must be an array of category IDs"),

	body("defaultView")
		.optional()
		.isIn(["list", "calendar", "chart"])
		.withMessage("defaultView must be 'list', 'calendar' or 'chart'"),

	body("recurringTransactionFrequency")
		.optional()
		.isIn(["daily", "weekly", "monthly"])
		.withMessage("recurringTransactionFrequency must be 'daily', 'weekly', or 'monthly'"),

	body("recurringTransactionDefaultCategory")
		.optional({ checkFalsy: true })
		.isUUID()
		.withMessage("recurringTransactionDefaultCategory must be a valid UUID"),
];
