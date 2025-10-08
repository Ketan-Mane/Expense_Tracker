import ApiResponse from "@helper/ApiResponse";
import { asyncHandler } from "@helper/asyncHandler";
import transactionService from "@services/transaction.service";
import { Request, Response } from "express";

const getTransactions = asyncHandler(async (req: Request, res: Response) => {
	const monthId = req.params?.id;
	const transactions = await transactionService.getTransactions({});
	res.status(200).json(new ApiResponse(200, "Success", transactions));
});

const createTransaction = asyncHandler(async (req: Request, res: Response) => {
	let data = req.body;
	const user = req.user;
	const transaction = await transactionService.createTransaction(data, user.id);
	res.status(201).json(new ApiResponse(201, "Transaction created", { transaction }));
});

const updateTransaction = asyncHandler(async (req: Request, res: Response) => {
	const { id } = req.params;
	const updates = req.body;
	const transaction = await transactionService.updateTransaction(id, updates);
	res.status(200).json(new ApiResponse(200, "Transaction updated", { transaction }));
});

const deleteTransaction = asyncHandler(async (req: Request, res: Response) => {
	const { id } = req.params;
	await transactionService.deleteTransaction(id);
	res.status(200).json(new ApiResponse(200, "Transaction deleted"));
});

export default { getTransactions, createTransaction, updateTransaction, deleteTransaction };
