import express from "express"
import { seePosts } from "../controllers/posts"
import {tokenAndRoleChecker} from "../middlewares/tokenAndRole";

const route = express();

route.post("/addPost", tokenAndRoleChecker(["user"]), seePosts);

export default route