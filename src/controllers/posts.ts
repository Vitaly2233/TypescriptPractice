import {User, IUser} from "../models/newUser";
import express, {Request, Response} from "express";
import {IPost, Post} from "../models/post";
import {Query} from "mongoose";

export const seePosts = async (req: Request, res: Response):Promise<void> => {

}

export const addPost = async (req: Request, res: Response):Promise<any> => {
  const {postName, description} = req.body;
  const {username, roles, _id} = req.user;
  if (!postName || !description) {
    return res.status(422).json({message: "the value of 'postName' and 'description' is missing"})
  }
  const foundedPosts:any = await Post.findOne({postName: postName});
  if (foundedPosts) {
    return res.json({message: "there is already a post with the name"});
  }
  res.send("hello")
  // const newPost:IPost = new Post({
  //   user: username,
  //   postName: postName,
  //   description: description
  // })
  // try {
  //   await newPost.save()
  // }catch (e) {
  //   console.log("not saved")
  // }
  // console.log("saved post");
}

export const changePost = async (req: Request, res: Response):Promise<void> => {

}

export const deletePost = async (req: Request, res: Response):Promise<void> => {

}