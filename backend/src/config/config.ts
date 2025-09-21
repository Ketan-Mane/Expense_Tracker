import dotenv from "dotenv";
dotenv.config();

const allowedDialects = ["mysql", "postgres", "sqlite", "mssql"] as const;
type Dialect = (typeof allowedDialects)[number];

const dialectEnv = process.env.DB_DIALECT;

interface DBConfig {
	username: string;
	password: string;
	database: string;
	host: string;
	dialect: "mysql" | "postgres" | "sqlite" | "mssql";
}

if (!dialectEnv || !allowedDialects.includes(dialectEnv as Dialect)) {
	throw new Error(`Invalid DB_DIALECT in .env: ${dialectEnv}`);
}

const dialect: Dialect = dialectEnv as Dialect;

const config: Record<string, DBConfig> = {
	development: {
		username: process.env.DB_USER || "root",
		password: process.env.DB_PASSWORD || "",
		database: process.env.DB_NAME || "database_development",
		host: process.env.DB_HOST || "127.0.0.1",
		dialect,
	},
	test: {
		username: process.env.DB_USER || "root",
		password: process.env.DB_PASSWORD || "",
		database: process.env.DB_NAME || "database_test",
		host: process.env.DB_HOST || "127.0.0.1",
		dialect,
	},
	production: {
		username: process.env.DB_USER || "",
		password: process.env.DB_PASSWORD || "",
		database: process.env.DB_NAME || "",
		host: process.env.DB_HOST || "",
		dialect,
	},
};

export default config;
