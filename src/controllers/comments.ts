import {Request, Response} from "express";
import {Post} from "../models/post";

interface IAddComment {
	owner: string;
	postName: string;
	comment: string;
	date: number;
}

export const getMyComments = async (req: Request, res: Response): Promise<Response> => {
	const {postName, comment, owner}:IAddComment = req.body;
	const {username} = req.user
	if(!comment) return res.status(404).json({message: "The 'comment' value is  missing"});

	// if comment is without the owner then comment will be added to user's post
	if (!owner) Post.findOneAndUpdate({username: username, isPrivate: false, postName: postName})

	return res.status(200).json({message: "success"});
}