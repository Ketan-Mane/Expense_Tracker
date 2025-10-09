import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "@config/db";

interface TransactionAttributes {
	id: number;
	monthId: string;
	categoryId: string;
	item?: string;
	amount: number;
	date?: Date;
	paymentMethod?: string;
	isRecurring?: boolean;
	type?: string;
	createdAt?: Date;
	updatedAt?: Date;
}

export interface TransactionCreationAttributes extends Optional<TransactionAttributes, "id" | "monthId"> {}

class Transaction extends Model<TransactionAttributes, TransactionCreationAttributes> implements TransactionAttributes {
	public id!: number;
	public monthId!: string;
	public categoryId!: string;
	public item?: string;
	public amount!: number;
	public date?: Date;
	public paymentMethod?: string;
	public isRecurring?: boolean;
	public type?: string;

	public readonly createdAt?: Date;
	public readonly updatedAt?: Date;
	public readonly deletedAt!: Date;
}

Transaction.init(
	{
		id: {
			type: DataTypes.UUIDV4,
			defaultValue: DataTypes.UUIDV4,
			primaryKey: true,
		},
		monthId: {
			type: DataTypes.UUID,
			allowNull: false,
			references: { model: "Months", key: "id" },
			onUpdate: "CASCADE",
			onDelete: "CASCADE",
		},
		categoryId: {
			type: DataTypes.UUID,
			allowNull: false,
			references: { model: "Categories", key: "id" },
			onUpdate: "CASCADE",
			onDelete: "SET NULL",
		},
		item: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		amount: {
			type: DataTypes.DECIMAL(10, 2),
			allowNull: false,
		},
		date: {
			type: DataTypes.DATEONLY,
			allowNull: true,
		},
		paymentMethod: {
			type: DataTypes.ENUM("Cash", "Credit Card", "Debit Card", "UPI", "Net Banking", "Other"),
			allowNull: true,
		},
		isRecurring: {
			type: DataTypes.BOOLEAN,
			allowNull: true,
			defaultValue: false,
		},
		type: {
			type: DataTypes.ENUM("Expense", "Income"),
			allowNull: true,
			defaultValue: "Expense",
		},
	},
	{
		sequelize,
		tableName: "Transactions",
		paranoid: true,
		defaultScope: { attributes: { exclude: ["userId", "deletedAt"] } },
	}
);

export default Transaction;
