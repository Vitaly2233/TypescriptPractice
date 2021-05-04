import {NextFunction, Request, Response} from "express";
import {IPost, Post} from "../models/post";

// interfaces
interface IChangePost {
  postName: string;
  newName?: string;
  newDescription?: string;
  owner?: string;
}
interface IDeletePost{
  postName: string;
  owner?: string;
}

//controllers functions
export const seePosts = async (req: Request, res: Response): Promise<Response> => {
  const username = req.user.username;
  const myPosts: IPost[] = await Post.find({user: username});
  return res.json(myPosts)
}

export const addPost = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
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

export const changePost = async (req: Request, res: Response): Promise<Response> => {
  const username = req.user.username;
  const {newDescription, newName, postName}: IChangePost = req.body;
  let updated: IPost | null;
  if (!newName)
    updated = await updateOne({user: username, postName: postName}, {description: newDescription});
  else
    updated = await updateOne({user: username, postName: postName}, {description: newDescription, postName: newName});
  if (!updated) return res.status(404).json({message: "Post with the name doesn't exist"});
  return res.status(200).json({message: "Updated post"});
}

export const deletePost = async (req: Request, res: Response): Promise<Response> => {
  const username = req.user.username;
  const { postName, owner}: IDeletePost = req.body;
  const deleted:IDeletePost | null = await Post.findOneAndDelete({user: username, postName: postName})
  if (deleted) return res.status(200).json({message: "deleted post"});
  else return res.status(404).json({message: "Can't delete post, probably you wrote wrong name of your post"});
}

// Functions for better looking code
async function updateOne(find: object, options: object): Promise<IPost | null> {
  return Post.findOneAndUpdate(find, options);
}