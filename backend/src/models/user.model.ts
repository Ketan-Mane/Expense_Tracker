import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "@config/db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

interface UserAttributes {
	id: string;
	name: string;
	email: string;
	password: string;
}

interface UserCreationAttributes extends Optional<UserAttributes, "id"> {}

class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
	public id!: string;
	public name!: string;
	public email!: string;
	public password!: string;

	public readonly createdAt!: Date;
	public readonly updatedAt!: Date;

	public isValidPassword(password: string) {
		return bcrypt.compareSync(password, this.password);
	}

	public toJSON() {
		const { password, ...values } = Object.assign({}, this.get());
		return values;
	}

	public generateAccessToken() {
		return jwt.sign({ sub: this.id }, process.env.JWT_SECRET as string, {
			expiresIn: "1d",
		});
	}
}

User.init(
	{
		id: {
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
			primaryKey: true,
		},
		name: { type: DataTypes.STRING, allowNull: false },
		email: { type: DataTypes.STRING, allowNull: false, unique: true },
		password: {
			type: DataTypes.STRING,
			allowNull: false,
			set(val: string) {
				const hashed = bcrypt.hashSync(val, 10);
				this.setDataValue("password", hashed);
			},
		},
	},
	{
		sequelize,
		tableName: "Users",
		defaultScope: { attributes: { exclude: ["password"] } },
		scopes: { withPassword: { attributes: { include: ["password"] } } },
	}
);

export default User;
