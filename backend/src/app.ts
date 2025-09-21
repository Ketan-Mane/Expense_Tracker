import express, { Application } from "express";
import cookieParser from "cookie-parser"
import errorHandler from "@middlewares/errorHandler.middleware";
import authRouter from "@routes/auth.route";

const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/auth", authRouter);

app.use(errorHandler);

export default app;
