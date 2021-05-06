import {model, Schema, Document} from 'mongoose';

export interface IUser extends Document {
  username: string;
  password: string;
  roles: string[];
  _id: string;
}

const UserSchema = new Schema({
  username: {type: String, required: true},
  password: {type: String, required: true},
  roles: {type: Array}
});
export const User = model<IUser>('User', UserSchema);
