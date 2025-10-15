import { Request, Response } from "express";
import { asyncHandler } from "helper/asyncHandler";
import ApiResponse from "helper/ApiResponse";
import { validationResult } from "express-validator";
import ApiError from "@helper/ApiError";
import User from "@models/user.model";
import axios from "axios";

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
	const { provider } = req.params;
	return res.oidc.login({
		authorizationParams: {
			prompt: "select_account",
			connection: provider,
			redirect_uri: "http://localhost:8000/api/auth/callback",
		},
	});
	// const { email, password } = req.body;

	// const user = await User.scope("withPassword").findOne({ where: { email } });
	// if (!user) {
	// 	throw new ApiError("Invalid credentials", 400, null);
	// }

	// const isPasswordMatch = user.isValidPassword(password);
	// if (!isPasswordMatch) {
	// 	throw new ApiError("Invalid credentials", 400, null);
	// }
	// const accessToken = user.generateAccessToken();
	// res.cookie("accessToken", accessToken, { httpOnly: true });
	// res.status(200).json(new ApiResponse(200, "success", { user: user.toJSON(), accessToken }));
});

const logout = asyncHandler(async (req: Request, res: Response) => {
	res.clearCookie("accessToken");
	res.oidc.logout();
	// res.status(200).json(new ApiResponse(200, "success", null));
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

const auth0Callback = asyncHandler(async (req: Request, res: Response) => {
	const auth0User: any = req.oidc.user; // Info from Auth0
	if (!auth0User) {
		throw new ApiError("Auth0 login failed", 400);
	}

	const {
		email,
		name,
		sub: auth0Id,
		picture,
	}: { email: string; name: string; sub: string; picture: string } = auth0User;

	let user = await User.findOne({ where: { email } });

	if (!user) {
		user = await User.create({ email, name, auth0Id, avatarUrl: picture });
	}

	// 3️⃣ Generate your own JWT
	const accessToken = user.generateAccessToken();

	// 4️⃣ Set JWT in httpOnly cookie
	res.cookie("accessToken", accessToken, { httpOnly: true });
	return res.redirect("http://localhost:5173/");
});

export default { register, login, logout, checkAuth, auth0Callback };
