import {model, Schema, Document} from 'mongoose';

export interface IKey extends Document {
  secretValue: string
}

const KeySchema = new Schema({
  secretValue: String
});
export const Key = model<IKey>('SecretKey', KeySchema);
