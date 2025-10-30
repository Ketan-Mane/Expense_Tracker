import { Request, Response } from "express";
import ApiError from "@helper/ApiError";
import User from "@models/user.model";
import { asyncHandler } from "@helper/asyncHandler";
import ApiResponse from "@helper/ApiResponse";

const register = asyncHandler(async (req: Request, res: Response) => {
	const { name, email, password } = req.body;

	const isUserExists = await User.findOne({ where: { email } });
	if (isUserExists) {
		throw new ApiError("User already exists with this email", 400, null);
	}

	const newUser = await User.create({ name, email, password });
	res.status(200).json(new ApiResponse(200, "success", { user: newUser.toJSON() }));
});

const login = asyncHandler(async (req: Request, res: Response) => {
	const { provider } = req.params;
	try {
		return res.oidc.login({
			returnTo: process.env.FRONTEND_URL,
			authorizationParams: {
				connection: provider || "google-oauth2",
				prompt: "select_account",
			},
		});
	} catch (error) {
		console.log(error);
		return res.redirect(process.env.FRONTEND_URL!);
	}
});

const logout = asyncHandler(async (req: Request, res: Response) => {
	return res.oidc.logout({
		returnTo: process.env.FRONTEND_URL,
	});
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
