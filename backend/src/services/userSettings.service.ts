import UserSettings from "@models/userSettings.model";

interface CreateOrUpdateSettingsDTO {
	userId: string;
	defaultPaymentMethod?: string | null;
	defaultCurrency?: string | null;
	financialMonthStart?: number;
	financialMonthEnd?: number;
	weeklyStartDay?: "Sunday" | "Monday";
	monthlyBudgetLimit?: number;
	budgetNotificationsEnabled?: boolean;
	transactionReminders?: boolean;
	favoriteCategories?: string[];
	defaultView?: "list" | "calendar" | "chart";
	recurringTransactionFrequency?: "daily" | "weekly" | "monthly";
	recurringTransactionDefaultCategory?: string | null;
}

const getUserSettings = async (userId: string) => {
	let settings = await UserSettings.findOne({ where: { userId } });
	return settings;
};

const createOrUpdateUserSettings = async (data: CreateOrUpdateSettingsDTO) => {
	const [settings, created] = await UserSettings.upsert(data, {
		returning: true,
	});
	return settings;
};

const initializeDefaultSettings = async (userId: string) => {
	// Create default settings for new user if not exists
	const existing = await UserSettings.findOne({ where: { userId } });
	if (!existing) {
		return UserSettings.create({
			userId,
			defaultPaymentMethod: "Cash",
			defaultCurrency: "INR",
			financialMonthStart: 1,
			financialMonthEnd: 30,
			weeklyStartDay: "Sunday",
			budgetNotificationsEnabled: true,
			transactionReminders: true,
			defaultView: "list",
		});
	}
	return existing;
};

export default {
	getUserSettings,
	createOrUpdateUserSettings,
	initializeDefaultSettings,
};
