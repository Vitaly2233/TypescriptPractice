import {model, Schema, Document} from 'mongoose';

export interface IPost extends Document{
  user: string;
  postName: string;
  description: string;
}

const PostSchema = new Schema({
  user: String,
  postName: String,
  description: String
})

export const Post = model<IPost>("Post", PostSchema)