import {model, Schema, Document} from 'mongoose';

export interface IComment extends Document{
  postId: String,
  username: String,
  date: number
}

const CommentSchema = new Schema({
  postId: String,
  username: String,
  date: Number
})

export const Post = model<IComment>("Comments", CommentSchema)