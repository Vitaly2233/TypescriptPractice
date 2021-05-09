import jwt, {Secret} from "jsonwebtoken";
import bcrypt from "bcryptjs"
import express, {Request, Response, Application} from "express";

// secret key
import {IKey, Key} from "../models/secretKey"

//models
import {User, IUser} from "../models/newUser"

const app: Application = express();

class auth {
  async registration(req: Request, res: Response): Promise<Response> {
    const {username, password} = req.body
    if (username === undefined || password === undefined)
      return res.status(403).json({message: "'username' and 'password' keys are missing"});

    const result: IUser | null = await User.findOne({username: username})
    if (result)
      return res.status(409).json({message: "can't add user, there is already user with that username"});

    // add some roles for users sooner
    let userRole: string[] = ["user"];

    const hashedPass: string = bcrypt.hashSync(password, 7);
    const newUser: IUser = new User({
      username: username,
      password: hashedPass,
      roles: userRole
    });
    await newUser.save();
    return res.status(201).json({message: "Created user"});
  }

  async login(req: Request, res: Response): Promise<Response> {
    const {username, password} = req.body

    // getting user from database
    const result: IUser | null = await User.findOne({username: username});
    if (!result)
      return res.status(400).json({message: "Can't find the user"});

    //comparing if passwords are same
    const validPassword: boolean = bcrypt.compareSync(password, result.password);
    if (!validPassword) return res.status(403).json({message: "Wrong password"});

    const secret: IKey | null = await Key.findOne({});
    if (!secret?.secretValue) {
      await app.get("/http://localhost:3001/generate_secret_key");
      return res.status(500).json({message: "Something wrong with the server, please try again"})
    }

    const userInform = {
      username: username,
      roles: result.roles,
      _id: result._id
    }
    const token = jwt.sign(userInform, secret.secretValue, {expiresIn: '2d'})
    return res.status(201).json({token: token})
  }
}

export default new auth();