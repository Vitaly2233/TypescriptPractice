import express from "express"
import {addPost, changePost, deletePost, seePosts} from "../controllers/posts"
import {tokenAndRoleChecker} from "../middlewares/tokenAndRole";

const route = express();

route.post("/add_post", tokenAndRoleChecker(["admin", "user"]), addPost);
route.put("/change_post", tokenAndRoleChecker(["user", "admin"]), changePost);
route.get("/get_my_posts", tokenAndRoleChecker(["user", "admin"]), seePosts);
route.delete("/delete_post", tokenAndRoleChecker(["user", "admin"]), deletePost)

export default route