import ApiResponse from "@helper/ApiResponse";
import { asyncHandler } from "@helper/asyncHandler";
import transactionService from "@services/transaction.service";
import { Request, Response } from "express";

const getTransactions = asyncHandler(async (req: Request, res: Response) => {
	const userId = req.user?.id;
	const transactions = await transactionService.getTransactions({ userId: userId as string });
	res.status(200).json(new ApiResponse(200, "Success", transactions));
});

const createTransaction = asyncHandler(async (req: Request, res: Response) => {
	const userId = req.user?.id;
	const { item, amount, date } = req.body;
	const transaction = await transactionService.createTransaction({
		userId: userId as string,
		item,
		amount,
		date: date as Date,
	});
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
