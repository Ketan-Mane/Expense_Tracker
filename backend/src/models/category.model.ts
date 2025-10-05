import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "@config/db";
import User from "./user.model";
import Transaction from "./transaction.model";

interface CategoryAttributes {
	id: string;
	userId?: string;
	name: string;
	isDefault?: boolean;
	color?: string;
	icon?: string;
	createdAt?: Date;
	updatedAt?: Date;
}

interface CategoryCreationAttributes extends Optional<CategoryAttributes, "id"> {}

class Category extends Model<CategoryAttributes, CategoryCreationAttributes> {
	public id!: string;
	public userId!: string;
	public name!: string;
	public isDefault?: boolean;
	public color?: string;
	public icon?: string;
	public readonly createdAt?: Date;
	public readonly updatedAt?: Date;
}

Category.init(
	{
		id: {
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
			primaryKey: true,
		},
		userId: {
			type: DataTypes.UUID,
			allowNull: true,
			references: { model: "Users", key: "id" },
			onUpdate: "CASCADE",
			onDelete: "CASCADE",
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		isDefault: {
			type: DataTypes.BOOLEAN,
			defaultValue: false,
		},
		color: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		icon: {
			type: DataTypes.STRING,
			allowNull: true,
		},
	},
	{
		sequelize,
		tableName: "Categories",
		timestamps: true,
	}
);

User.hasMany(Category, { foreignKey: "userId", as: "categories" });
Category.belongsTo(User, { foreignKey: "userId", as: "user" });

Category.hasMany(Transaction, { foreignKey: "categoryId", as: "transactions" });
Transaction.belongsTo(Category, { foreignKey: "categoryId", as: "category" });

export type { CategoryAttributes, CategoryCreationAttributes };
export default Category;
