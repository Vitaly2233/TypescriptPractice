import {model, Schema, Document} from 'mongoose';

export interface IPost extends Document{
  user: string;
  postName: string;
  description: string;
  comments: string[];
  date: number;
}

const PostSchema = new Schema({
  user: String,
  postName: String,
  description: String,
  comments: [{type: String, ref: "Comments"}],
  date: Number
})

export const Post = model<IPost>("Post", PostSchema)