import {model, Schema, Document} from 'mongoose';

export interface IComment extends Document{
  postId: String,
  username: String,

}