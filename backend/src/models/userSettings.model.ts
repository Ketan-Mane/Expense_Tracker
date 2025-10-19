import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/db";
import User from "./user.model";

interface UserSettingsAttributes {
	id: string;
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
	createdAt?: Date;
	updatedAt?: Date;
}

interface UserSettingsCreationAttributes extends Optional<UserSettingsAttributes, "id"> {}

class UserSettings
	extends Model<UserSettingsAttributes, UserSettingsCreationAttributes>
	implements UserSettingsAttributes
{
	public id!: string;
	public userId!: string;
	public defaultPaymentMethod!: string | null;
	public defaultCurrency!: string | null;
	public financialMonthStart!: number;
	public financialMonthEnd!: number;
	public weeklyStartDay!: "Sunday" | "Monday";
	public monthlyBudgetLimit!: number;
	public budgetNotificationsEnabled!: boolean;
	public transactionReminders!: boolean;
	public favoriteCategories!: string[];
	public defaultView!: "list" | "calendar" | "chart";
	public recurringTransactionFrequency!: "daily" | "weekly" | "monthly";
	public recurringTransactionDefaultCategory!: string | null;

	public readonly createdAt!: Date;
	public readonly updatedAt!: Date;
}

UserSettings.init(
	{
		id: {
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
			primaryKey: true,
		},
		userId: {
			type: DataTypes.UUID,
			allowNull: false,
			unique: true,
			references: { model: "Users", key: "id" },
			onDelete: "CASCADE",
		},
		defaultPaymentMethod: { type: DataTypes.STRING, allowNull: true },
		defaultCurrency: { type: DataTypes.STRING, allowNull: true },
		financialMonthStart: { type: DataTypes.INTEGER, allowNull: true },
		financialMonthEnd: { type: DataTypes.INTEGER, allowNull: true },
		weeklyStartDay: { type: DataTypes.ENUM("Sunday", "Monday"), allowNull: true },
		monthlyBudgetLimit: { type: DataTypes.DECIMAL(12, 2), allowNull: true },
		budgetNotificationsEnabled: { type: DataTypes.BOOLEAN, defaultValue: true },
		transactionReminders: { type: DataTypes.BOOLEAN, defaultValue: true },
		favoriteCategories: { type: DataTypes.ARRAY(DataTypes.STRING), allowNull: true },
		defaultView: { type: DataTypes.ENUM("list", "calendar", "chart"), defaultValue: "list" },
		recurringTransactionFrequency: {
			type: DataTypes.ENUM("daily", "weekly", "monthly"),
			allowNull: true,
		},
		recurringTransactionDefaultCategory: { type: DataTypes.UUID, allowNull: true },
	},
	{
		sequelize,
		tableName: "UserSettings",
	}
);

UserSettings.belongsTo(User, { foreignKey: "userId", as: "user" });

export default UserSettings;
