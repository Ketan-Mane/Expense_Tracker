import express, { Application } from "express";
import cookieParser from "cookie-parser";
import errorHandler from "@middlewares/errorHandler.middleware";
import authRouter from "@routes/auth.route";
import authMiddleware from "@middlewares/auth.middleware";
import transactionRouter from "@routes/transaction.route";
import monthRouter from "@routes/month.route";
import categoryRouter from "@routes/category.route";
import budgetRouter from "@routes/budget.route";

const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/auth", authRouter);
app.use(authMiddleware);
app.use("/api/transactions", transactionRouter);
app.use("/api/months", monthRouter);
app.use("/api/categories", categoryRouter);
app.use("/api/budgets", budgetRouter);

app.use(errorHandler);

export default app;
