import { DataTypes, Model } from "sequelize";
import sequelize from "@config/db";
import User from "./user.model";
import Month from "./month.model";
import Category from "./category.model";

interface BudgetAttributes {
	id: string;
	userId: string;
	monthId: string;
	categoryId?: string | null;
	amount: number;
	createdAt?: Date;
	updatedAt?: Date;
}

interface BudgetCreationAttributes extends Omit<BudgetAttributes, "id" | "createdAt" | "updatedAt"> {}

class Budget extends Model<BudgetAttributes, BudgetCreationAttributes> implements BudgetAttributes {
	public id!: string;
	public userId!: string;
	public monthId!: string;
	public categoryId!: string | null;
	public amount!: number;
	public readonly createdAt!: Date;
	public readonly updatedAt!: Date;
}

Budget.init(
	{
		id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
		userId: { type: DataTypes.UUID, allowNull: false },
		monthId: { type: DataTypes.UUID, allowNull: false },
		categoryId: { type: DataTypes.UUID, allowNull: true },
		amount: { type: DataTypes.FLOAT, allowNull: false },
	},
	{
		sequelize,
		tableName: "Budgets",
		timestamps: true,
	}
);

Budget.belongsTo(User, { foreignKey: "userId", as: "user" });
Budget.belongsTo(Month, { foreignKey: "monthId", as: "month" });
Budget.belongsTo(Category, { foreignKey: "categoryId", as: "category" });

User.hasMany(Budget, { foreignKey: "userId", as: "budgets" });
Month.hasMany(Budget, { foreignKey: "monthId", as: "budgets" });
Category.hasMany(Budget, { foreignKey: "categoryId", as: "budgets" });

export default Budget;
export type { BudgetAttributes, BudgetCreationAttributes };
