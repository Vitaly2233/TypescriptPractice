import jwt, {Secret} from "jsonwebtoken";
import express, {Request, Response} from "express";

const app: express.Application = express();
const bcrypt = require("bcryptjs");
// secretValue
import {IKey, Key} from "../models/secretKey"
//models
import {User, IUser} from "../models/newUser";

class auth {
  async registration(req: Request, res: Response): Promise<void> {
    const {username, password} = req.body
    if (username === undefined || password === undefined) {
      res.status(403).json({message: "'username' and 'password' keys are missing"});
      return;
    }
    const result: IUser | null = await User.findOne({username: username})
    if (!result) {
      // add some roles for users sooner
      let userRole: string[] = ["user"];
      const hashedPass: string = bcrypt.hashSync(password, 7);
      const newUser: IUser = new User({
        username: username,
        password: hashedPass,
        roles: userRole
      });
      await newUser.save();
      res.status(201).json({message: "Created user"});
      return;
    }
    res.status(409).json({message: "can't add user, there is already user with that username"});
  }

  async login(req: Request, res: Response): Promise<void> {
    const {username, password} = req.body
    // getting user from database
    const result: IUser | null = await User.findOne({username: username});
    if (!result) {
      res.status(400).json({message: "Can't find the user"});
      return
    }
    //comparing if passwords are same
    const validPassword: boolean = bcrypt.compareSync(password, result.password);
    if (validPassword) {
      const secretObj:any = await Key.findOne({});
      const secretWord: string = secretObj.secretValue;
      if (!secretWord) {
        await app.get("/http://localhost:3001/generate_secret_key");
        res.status(500).json({message: "Something wrong with the server, please try again"})
        return
      }
      const userInform = {
        username: username,
        roles: result.roles,
        _id: result._id
      }
      const token = jwt.sign(userInform, secretWord, {expiresIn: '30m'})
      res.status(201).json({token: token})
      return;
    }
  }
}

export default new auth();