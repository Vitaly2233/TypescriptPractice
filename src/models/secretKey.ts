import {model, Schema, Document, Model} from 'mongoose';

export interface IKey extends Document {
  secretValue: string
}

const KeySchema: Schema = new Schema({
  secretValue: String
});

export const Key:Model<IKey>= model('SecretKey', KeySchema);
