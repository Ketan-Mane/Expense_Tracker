import "module-alias/register";
import { configDotenv } from "dotenv";
configDotenv();

import app from "./app";
import sequelize from "./config/db";

const PORT = process.env.PORT || 3000;

sequelize.authenticate().then(() => {
	console.log("Database connected");
	app.listen(PORT, () => {
		console.log(`Server started \nURL : http://localhost:${PORT}`);
	});
});
