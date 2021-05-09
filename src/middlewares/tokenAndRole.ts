const jwt = require("jsonwebtoken");
import {NextFunction, Request, Response} from "express";
import {Key, IKey} from "../models/secretKey";

interface IUserFromToken extends Object {
	username: string;
	roles: string[];
	_id: string;
}

export const tokenAndRoleChecker = function (allowedRoles: string[]) {
	return async function (req: Request, res: Response, next: NextFunction): Promise<Response | void> {
		if (!req.headers.authorization)
			return res.status(401).json({message: "Probably you're not authorized, or you token is missing"});
		const token = req.headers.authorization.split(" ")[1];
		const secretKey: IKey | null = await Key.findOne({});
		if (!secretKey)
			return res.status(500).json({message: "Something wrong with the server, please try again"});

		try {
			// checking if token is valid
			const user: IUserFromToken = jwt.verify(token, secretKey.secretValue);

			// access to every user
			if (allowedRoles.includes("every")) {
				req.user = {username: user.username, roles: user.roles, _id: user._id};
				return next();
			}

			let isAllowed: boolean = false;
			allowedRoles.forEach((role) => {
				user.roles.forEach(async (userRole) => {
					if (role === userRole) {
						// sending user's data to endpoints
						req.user = {username: user.username, roles: user.roles, _id: user._id};
						isAllowed = true;
					}
				})
			})
			if (isAllowed)
				return next();

		} catch (e) {
			return res.status(403).json({message: "Token is expired, or invalid login again"});
		}
	}
}
