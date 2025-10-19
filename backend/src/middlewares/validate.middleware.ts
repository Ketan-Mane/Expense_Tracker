import { validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";
import { asyncHandler } from "@helper/asyncHandler";
import ApiError from "@helper/ApiError";

export const validate = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
	const errors = validationResult(req).formatWith(({ msg }) => msg);
	if (!errors.isEmpty()) {
		throw new ApiError("validation error", 400, errors.mapped());
	}
	next();
});
