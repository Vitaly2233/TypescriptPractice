import {User, IUser} from "../models/newUser";
import express, {NextFunction, Request, Response} from "express";
import {IPost, Post} from "../models/post";

export const seePosts = async (req: Request, res: Response): Promise<void> => {
  const {postName, description} = req.body;
  const username = req.user.username;
  const myPosts:IPost[] = await Post.find({user: username});
  res.json(myPosts)
}

export const addPost = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  const {postName, description} = req.body;
  const username = req.user.username;

  if (!postName || !description) {
    return res.status(422).json({message: "the value of 'postName' and 'description' is missing"});
  }
  const foundedPosts: any = await Post.findOne({postName: postName});
  if (foundedPosts) {
    return res.json({message: "there is already a post with the name"});
  }
  const newPost: IPost = new Post({
    user: username,
    postName: postName,
    description: description
  })
  await newPost.save();
  return res.status(200).json({message: "post is saved"})
}

export const changePost = async (req: Request, res: Response): Promise<void> => {

}

export const deletePost = async (req: Request, res: Response): Promise<void> => {

}