import express from "express"
import {addPost, changePost, deleteAllPosts, deletePost, getAllPosts, getMyPosts} from "../controllers/posts"
import {tokenAndRoleChecker} from "../middlewares/tokenAndRole";

const route = express();

route.get("/all_posts", tokenAndRoleChecker(["admin", "user"]), getAllPosts);
route.get("/get_my_posts", tokenAndRoleChecker(["user", "admin"]), getMyPosts);
route.post("/add_post", tokenAndRoleChecker(["admin", "user"]), addPost);
route.put("/change_post", tokenAndRoleChecker(["user", "admin"]), changePost);
route.delete("/delete_post", tokenAndRoleChecker(["user", "admin"]), deletePost);
route.delete("/delete_all_posts", tokenAndRoleChecker(["admin"]), deleteAllPosts);

export default route