import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "@config/db";
import User from "./user.model";

interface TransactionAttributes {
	id: number;
	userId: string;
	item?: string;
	amount: number;
	date?: Date;
	createdAt?: Date;
	updatedAt?: Date;
}

export interface TransactionCreationAttributes extends Optional<TransactionAttributes, "id"> {}

class Transaction extends Model<TransactionAttributes, TransactionCreationAttributes> implements TransactionAttributes {
	public id!: number;
	public userId!: string;
	public item?: string;
	public amount!: number;
	public date?: Date;

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
		userId: {
			type: DataTypes.UUID,
			allowNull: false,
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
	},
	{
		sequelize,
		tableName: "Transactions",
		paranoid: true,
		defaultScope: { attributes: { exclude: ["userId", "deletedAt"] } },
	}
);

Transaction.belongsTo(User, { foreignKey: "userId", as: "user" });
User.hasMany(Transaction, { foreignKey: "userId", as: "transactions" });
export default Transaction;
