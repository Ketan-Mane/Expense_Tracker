import express, { Application, Request, Response } from "express";
import cookieParser from "cookie-parser";
import errorHandler from "@middlewares/errorHandler.middleware";
import authRouter from "@routes/auth.route";
import authMiddleware from "@middlewares/auth.middleware";
import transactionRouter from "@routes/transaction.route";
import monthRouter from "@routes/month.route";
import categoryRouter from "@routes/category.route";
import budgetRouter from "@routes/budget.route";
import { auth } from "express-openid-connect";
import morgan from "morgan";

const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(morgan("dev"));
app.use(
	auth({
		authRequired: false,
		auth0Logout: true,
		baseURL: "http://localhost:8000",
		clientSecret: process.env.AUTH0_CLIENT_SECRET,
		clientID: process.env.AUTH0_CLIENT_ID,
		secret: "Ketan-Mane",
		issuerBaseURL: process.env.AUTH0_DOMAIN,
		authorizationParams: {
			response_type: "code",
			audience: "expense-tracker",
			scope: "openid profile email offline_access",
			prompt: "select_account",
		},
	})
);

app.use("/api/auth", authRouter);
app.use(authMiddleware);
app.use("/api/transactions", transactionRouter);
app.use("/api/months", monthRouter);
app.use("/api/categories", categoryRouter);
app.use("/api/budgets", budgetRouter);

app.use(errorHandler);

export default app;
