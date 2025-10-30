import ApiResponse from "@helper/ApiResponse";
import { asyncHandler } from "@helper/asyncHandler";
import User from "@models/user.model";
import { NextFunction, Request, Response } from "express";

const authMiddleware = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
	if (!req.oidc || !req.oidc.isAuthenticated()) {
		return res.status(401).json(new ApiResponse(401, "Unauthorized", null));
	}

	const auth0User = req.oidc.user;
	if (!auth0User?.sub) {
		await res.oidc.logout({ returnTo: process.env.FRONTEND_URL });
		return res.status(401).json(new ApiResponse(401, "Missing Auth0 user", null));
	}

	const user = await User.findOne({
		where: { auth0Id: auth0User.sub },
	});

	if (!user) {
		await res.oidc.logout({ returnTo: process.env.FRONTEND_URL });
		return res.status(401).json(new ApiResponse(401, "User not found", null));
	}

	req.user = user;
	next();
});

export default authMiddleware;
