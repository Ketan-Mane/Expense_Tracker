import User from "@models/user.model";
import { NextFunction, Request, Response } from "express";

export const createOrUpdateUserMiddleware = async (req: Request, res: Response, next: NextFunction) => {
	if (!req.oidc?.isAuthenticated()) return next();

	const auth0User = req.oidc.user;
	if (!auth0User?.sub) return next();
	let user = await User.findOne({ where: { auth0Id: auth0User.sub } });

	if (!user) {
		user = await User.create({
			auth0Id: auth0User.sub,
			name: auth0User.name,
			email: auth0User.email,
			avatarUrl: auth0User.picture,
		});
	} else if (user.name !== auth0User.name || user.avatarUrl !== auth0User.picture) {
		await user.update({
			name: auth0User.name,
			avatarUrl: auth0User.picture,
		});
	}

	req.user = user;
	next();
};
