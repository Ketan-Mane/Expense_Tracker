import { Request, Response } from "express";
import { asyncHandler } from "helper/asyncHandler";
import ApiResponse from "helper/ApiResponse";
import { validationResult } from "express-validator";
import ApiError from "@helper/ApiError";
import User from "@models/user.model";

const register = asyncHandler(async (req: Request, res: Response) => {
	const errors = validationResult(req).formatWith(({ msg }) => msg);
	if (!errors.isEmpty()) {
		throw new ApiError("validation error", 400, errors.mapped());
	}
	const { name, email, password } = req.body;

	const isUserExists = await User.findOne({ where: { email } });
	if (isUserExists) {
		throw new ApiError("User already exists with this email", 400, null);
	}

	const newUser = await User.create({ name, email, password });

	res.status(200).json(new ApiResponse(200, "success", { user: newUser.toJSON() }));
});

const login = asyncHandler(async (req: Request, res: Response) => {
	const { email, password } = req.body;

	const user = await User.scope("withPassword").findOne({ where: { email } });
	if (!user) {
		throw new ApiError("Invalid credentials", 400, null);
	}

	const isPasswordMatch = user.isValidPassword(password);
	if (!isPasswordMatch) {
		throw new ApiError("Invalid credentials", 400, null);
	}
	const accessToken = user.generateAccessToken();
	res.cookie("accessToken", accessToken, { httpOnly: true });
	res.status(200).json(new ApiResponse(200, "success", { user: user.toJSON(), accessToken }));
});

const logout = asyncHandler(async (req: Request, res: Response) => {
	res.clearCookie("accessToken");
	res.status(200).json(new ApiResponse(200, "success", null));
});

const checkAuth = asyncHandler(async (req: Request, res: Response) => {
	const userId = req.user?.id;
	if (!userId) {
		throw new ApiError("Unauthorized", 401, null);
	}
	const user = await User.findByPk(userId);
	if (!user) {
		throw new ApiError("User not found", 404, null);
	}
	res.status(200).json(new ApiResponse(200, "success", { user }));
});

export default { register, login, logout, checkAuth };
