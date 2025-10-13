import ApiResponse from "@helper/ApiResponse";
import { asyncHandler } from "@helper/asyncHandler";
import monthService from "@services/month.service";
import { Request, Response } from "express";

const getMonths = asyncHandler(async (req: Request, res: Response) => {
	const userId = req.user?.id;
	const { months, metadata } = await monthService.getMonths({ userId: userId as string });
	res.status(200).json(new ApiResponse(200, "Success", { months, metadata }));
});

const getMonth = asyncHandler(async (req: Request, res: Response) => {
	const { id } = req.params;
	const month = await monthService.getMonth(id);
	res.status(200).json(new ApiResponse(200, "Success", { month }));
});

const createMonth = asyncHandler(async (req: Request, res: Response) => {
	const userId = req.user?.id;
	const data = { ...req.body, userId };
	const month = await monthService.createMonth(data);
	res.status(201).json(new ApiResponse(201, "Month created", { month }));
});

const updateMonth = asyncHandler(async (req: Request, res: Response) => {
	const { id } = req.params;
	const updates = req.body;
	const month = await monthService.updateMonth(id, updates);
	res.status(200).json(new ApiResponse(200, "Month updated", { month }));
});

const deleteMonth = asyncHandler(async (req: Request, res: Response) => {
	const { id } = req.params;
	await monthService.deleteMonth(id);
	res.status(204).send();
});

// const archiveMonth = asyncHandler(async (req: Request, res: Response) => {
// 	const { id } = req.params;
// 	const month = await monthService.archiveMonth(id);
// 	res.status(200).json(new ApiResponse(200, "Month archived", { month }));
// });

// const unarchiveMonth = asyncHandler(async (req: Request, res: Response) => {
// 	const { id } = req.params;
// 	const month = await monthService.unarchiveMonth(id);
// 	res.status(200).json(new ApiResponse(200, "Month unarchived", { month }));
// });

export default { getMonths, getMonth, createMonth, updateMonth, deleteMonth };
