import { Request, Response } from "express";
import userSettingsService from "@services/userSettings.service";
import { asyncHandler } from "@helper/asyncHandler";
import ApiResponse from "@helper/ApiResponse";

// Get user settings
const getSettings = asyncHandler(async (req: Request, res: Response) => {
	const userId = req.user.id; // assuming user id is in req.user
	const settings = await userSettingsService.getUserSettings(userId);
	return res.status(200).json(new ApiResponse(200, "Success", { settings }));
});

// Create or update settings
const updateSettings = asyncHandler(async (req: Request, res: Response) => {
	const userId = req.user.id;
	const data = { ...req.body, userId };
	const settings = await userSettingsService.createOrUpdateUserSettings(data);
	return res.status(200).json(new ApiResponse(200, "Success", settings));
});

// Initialize default settings (optional, can call after user signup)
const initializeSettings = asyncHandler(async (req: Request, res: Response) => {
	const userId = req.user.id;
	const settings = await userSettingsService.initializeDefaultSettings(userId);
	return res.status(200).json(new ApiResponse(200, "Success", settings));
});

export default { getSettings, updateSettings, initializeSettings };
