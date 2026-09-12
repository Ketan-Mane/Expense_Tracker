import ApiResponse from "@helper/ApiResponse";
import { asyncHandler } from "@helper/asyncHandler";
import transactionService from "@services/transaction.service";
import { Request, Response } from "express";

const getTransactions = asyncHandler(async (req: Request, res: Response) => {
	const limit = Number(req.query.limit) || 50;
	const page = Number(req.query.page) || 1;
	const category = typeof req.query.category === "string" ? req.query.category : null;
	const search = typeof req.query.search === "string" ? req.query.search : null;
	const month = typeof req.query.month === "string" ? req.query.month : null;

	const user = req.user;
	const transactions = await transactionService.getTransactions({
		userId: user.id,
		limit,
		page,
		category,
		search,
		month,
	});
	res.status(200).json(new ApiResponse(200, "Success", transactions));
});

const createTransaction = asyncHandler(async (req: Request, res: Response) => {
	let data = req.body;
	const user = req.user;
	const transaction = await transactionService.createTransaction(data, user.id);
	res.status(201).json(new ApiResponse(201, "Transaction created", { transaction }));
});

const updateTransaction = asyncHandler(async (req: Request<{ id: string }>, res: Response) => {
	const { id } = req.params;
	const updates = req.body;
	const user = req.user;

	const transaction = await transactionService.updateTransaction(id, user.id, updates);
	res.status(200).json(new ApiResponse(200, "Transaction updated", { transaction }));
});

const deleteTransaction = asyncHandler(async (req: Request<{ id: string }>, res: Response) => {
	const { id } = req.params;
	await transactionService.deleteTransaction(id);
	res.status(200).json(new ApiResponse(200, "Transaction deleted"));
});

const getCategoryAnalytics = asyncHandler(async (req: Request, res: Response) => {
	const month = req.query.month as string;
	const analytics = await transactionService.getCategoryAnalytics(month);
	res.status(200).json(new ApiResponse(200, "Success", analytics));
});

const getMonthlyAnalytics = asyncHandler(async (req: Request, res: Response) => {
	const userId = req.user.id;
	const analytics = await transactionService.getMonthlyAnalytics(userId);
	res.status(200).json(new ApiResponse(200, "Success", analytics));
});

export default {
	getTransactions,
	createTransaction,
	updateTransaction,
	deleteTransaction,
	getCategoryAnalytics,
	getMonthlyAnalytics,
};
