import ApiResponse from "@helper/ApiResponse";
import { asyncHandler } from "@helper/asyncHandler";
import budgetService from "@services/budget.service";
import { Request, Response } from "express";

const getBudgets = asyncHandler(async (req: Request, res: Response) => {
	const userId = req.user?.id;
	const page = parseInt(req.query.page as string) || 1;
	const limit = parseInt(req.query.limit as string) || 10;
	const { budgets, metadata } = await budgetService.getBudgetsByUserId({
		userId: userId as string,
		page,
		limit,
	});
	res.status(200).json(new ApiResponse(200, "Success", { budgets, metadata }));
});

const createBudget = asyncHandler(async (req: Request, res: Response) => {
	const userId = req.user?.id;
	const budgetData = { ...req.body, userId };
	const budget = await budgetService.createBudget(budgetData);
	res.status(201).json(new ApiResponse(201, "Budget created successfully", { budget }));
});

const updateBudget = asyncHandler(async (req: Request, res: Response) => {
	const budgetId = req.params.id;
	const budgetData = req.body;
	const updatedBudget = await budgetService.updateBudget(budgetId, budgetData);
	if (!updatedBudget) {
		return res.status(404).json(new ApiResponse(404, "Budget not found"));
	}
	res.status(200).json(new ApiResponse(200, "Budget updated successfully", { budget: updatedBudget }));
});

const deleteBudget = asyncHandler(async (req: Request, res: Response) => {
	const budgetId = req.params.id;
	const isDeleted = await budgetService.deleteBudget(budgetId);
	if (!isDeleted) {
		return res.status(404).json(new ApiResponse(404, "Budget not found"));
	}
	res.status(200).json(new ApiResponse(200, "Budget deleted successfully"));
});

export default { getBudgets, createBudget, updateBudget, deleteBudget };
