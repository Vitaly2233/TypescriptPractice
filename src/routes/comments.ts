import express from "express"

import {tokenAndRoleChecker} from "../middlewares/tokenAndRole";
import {getMyComments} from "../controllers/comments";

const route = express();

route.get("/addComment", tokenAndRoleChecker(["every"]), getMyComments);

export default route
