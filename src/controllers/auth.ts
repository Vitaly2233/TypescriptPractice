import jwt from "jsonwebtoken";
import express from "express";
const bcrypt = require("bcryptjs");
//models
import {User} from "../models/newUser";

class auth {
  async registration(req: express.Request, res: express.Response): Promise<void> {
    const {username, password} = req.body
    console.log(req.body)
    if (username === undefined || password === undefined) {
      res.status(403).json({message: "'username' and 'password' keys are missing"});
      return;
    }
    const result = await User.findOne({username: username})
    if (!result) {
      const hashedPas = bcrypt.hashSync(password, 7);
      const newUser = new User({
        username: username,
        password: hashedPas
      });
      await newUser.save();
      res.status(201).json({message: "Created user"});
      return;
    }
    res.status(409).json({message: "can't add user"});
  }
}

export default new auth();