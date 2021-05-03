const jwt = require("jsonwebtoken");
import {NextFunction, Request, Response} from "express";
import {Key, IKey} from "../models/secretKey";

interface IUser extends Object {
  username: string;
  roles: String[];
}
export const tokenAndRoleChecker = function (allowedRoles: String[]) {
  return async function (req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      if (req.headers.authorization) {
        const token = req.headers.authorization.split(" ")[1];
        const secretKey: IKey | null = await Key.findOne({});
        if (!secretKey) {
          res.status(500).json({message: "Something wrong with the server, please try again"});
          return;
        }
        try {
          const user:IUser = jwt.verify(token, secretKey.secretValue);
          allowedRoles.forEach((role) => {
            user.roles.forEach((userRole) => {
              if (role === userRole) {
                console.log("entering is allowed");
                req.userRole = user.roles;
                req.username = user.username;
                next();
              }
            })
          })
        } catch (e) {
          res.status(403).json({message: "Token is expired, or invalid login again"});
          return;
        }
      } else {
        res.status(401).json({message: "Probably you're not authorized, or you token is missing"});
        return;
      }
    } catch (e) {
      console.log(e);
    }
    next();
  }
}
