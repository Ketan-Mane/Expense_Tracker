import User from "./user.model";
import Transaction from "./transaction.model";
import { DataTypes, Model } from "sequelize";
import sequelize from "@config/db";

interface MonthAttributes {
	id: string;
	userId: string;
	name: string;
	startDate: Date;
	endDate: Date;
	archived: boolean;
	createdAt?: Date;
	updatedAt?: Date;
}

interface MonthCreationAttributes extends Omit<MonthAttributes, "id" | "createdAt" | "updatedAt"> {}

class Month extends Model<MonthAttributes, MonthCreationAttributes> implements MonthAttributes {
	public id!: string;
	public userId!: string;
	public name!: string;
	public startDate!: Date;
	public endDate!: Date;
	public archived!: boolean;
	public readonly createdAt!: Date;
	public readonly updatedAt!: Date;
}

Month.init(
	{
		id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
		userId: { type: DataTypes.UUID, allowNull: false, references: { model: User, key: "id" } },
		name: { type: DataTypes.STRING, allowNull: false },
		startDate: { type: DataTypes.DATE, allowNull: false },
		endDate: { type: DataTypes.DATE, allowNull: false },
		archived: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
	},
	{
		sequelize,
		tableName: "Months",
		paranoid: true,
		timestamps: true,
		defaultScope: { attributes: { exclude: ["userId", "deletedAt"] } },
	}
);

Month.belongsTo(User, { foreignKey: "userId", as: "user" });
User.hasMany(Month, { foreignKey: "userId", as: "months" });
Month.hasMany(Transaction, { foreignKey: "monthId", as: "transactions" });
Transaction.belongsTo(Month, { foreignKey: "monthId", as: "months" });

export default Month;

export type { MonthAttributes, MonthCreationAttributes };
