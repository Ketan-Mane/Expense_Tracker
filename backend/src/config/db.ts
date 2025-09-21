import config from "./config";
import { Sequelize } from "sequelize";

const env = process.env.NODE_ENV || "development";
const sequelize = new Sequelize({
	...config[env],
	logging: false,
});

export default sequelize;
