import {User, IUser} from "../models/newUser";
import {Request, Response} from "express";

export const seePosts = async (req: Request, res: Response):Promise<void> => {

}

export const addPost = async (req: Request, res: Response):Promise<void> => {
  const {username, roles, _id} = req.user;


}

export const changePost = async (req: Request, res: Response):Promise<void> => {

}

export const deletePost = async (req: Request, res: Response):Promise<void> => {

}