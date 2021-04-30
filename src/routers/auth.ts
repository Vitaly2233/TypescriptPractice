import express from "express"
import controller from "../controllers/auth"

const route = express();

route.get("/register", controller.registration)

export default route