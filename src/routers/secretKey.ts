import mongoose from "mongoose";
import {Key} from "../models/secretKey";
import {Request, Response} from "express";

export async function generateKey(req: Request, res: Response) {
  const result = await Key.findOne({})
  if (!result) {
    const newKey = new Key({
      secretValue: makeKey()
    })
    await newKey.save()
  }
}

function makeKey(): String {
  let result: Array<string> = [];
  let characters: String = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (let i = 0; i < characters.length; i++) {
    result.push(characters.charAt(Math.floor(Math.random() * characters.length)));
  }
  return result.join('');
}

