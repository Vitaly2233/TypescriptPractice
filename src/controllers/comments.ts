import {Request, Response} from "express";

export const getMyComments = async (res: Response, req: Request): Promise<Response> => {
	return res.status(200).json({message: 'added'});
}