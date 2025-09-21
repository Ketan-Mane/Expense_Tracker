import ApiResponse from "@helper/ApiResponse";
import { asyncHandler } from "@helper/asyncHandler";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

interface TokenPayload extends jwt.JwtPayload {
	sub: string;
}

const authMiddleware = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
	const token = req.cookies.accessToken || req.headers.authorization?.split(" ")[1];
	if (!token) {
		return res.status(401).json(new ApiResponse(401, "Unauthorized", null));
	}
	
	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as TokenPayload;

		req.user = { id: decoded.sub };

		next();
	} catch (error) {
		return res.status(401).json(new ApiResponse(401, "Unauthorized: Invalid or expired token", null));
	}
});

export default authMiddleware;