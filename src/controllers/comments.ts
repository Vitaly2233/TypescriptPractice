import {Request, Response} from "express";

export const getMyComments = async (req: Request, res: Response): Promise<Response> => {
	return res.status(200).json({message: 'added'});
}