import categoryService from "../services/category.service";
import { Request, Response } from "express";
import ApiResponse from "../helper/ApiResponse";
import { asyncHandler } from "../helper/asyncHandler";

const getCategories = asyncHandler(async (req: Request, res: Response) => {
	const userId = req.user?.id as string;

	const page = req.query.page ? parseInt(req.query.page as string, 10) : 1;
	const limit = req.query.limit ? parseInt(req.query.limit as string, 10) : 10;
	const categories = await categoryService.getCategories({ userId, page, limit });
	res.status(200).json(new ApiResponse(200, "Success", categories));
});

const createCategory = asyncHandler(async (req: Request, res: Response) => {
	const userId = req.user?.id as string;
	const { name, color } = req.body;
	const category = await categoryService.createCategory({ name, userId, color });
	res.status(201).json(new ApiResponse(201, "Category created", category));
});

const updateCategory = asyncHandler(async (req: Request, res: Response) => {
	const userId = req.user?.id as string;
	const { id } = req.params;
	const { name, color } = req.body;
	const category = await categoryService.updateCategory({ id, name, userId, color });
	res.status(200).json(new ApiResponse(200, "Category updated", category));
});

const deleteCategory = asyncHandler(async (req: Request, res: Response) => {
	const userId = req.user?.id as string;
	const { id } = req.params;
	await categoryService.deleteCategory({ id, userId });
	res.status(200).json(new ApiResponse(200, "Category deleted"));
});

export default { getCategories, createCategory, updateCategory, deleteCategory };
