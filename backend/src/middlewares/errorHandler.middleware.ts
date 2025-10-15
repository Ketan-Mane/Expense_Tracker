import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import ApiError from "helper/ApiError";
import ApiResponse from "helper/ApiResponse";

const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
	console.log(err);
	if (err instanceof ApiError) {
		const { statusCode, message, errors } = err;
		return res.status(statusCode).json(new ApiResponse(statusCode, message, null, errors));
	}

	res.status(500).json(new ApiResponse(500, err.message, null, null));
};

export default errorHandler;
