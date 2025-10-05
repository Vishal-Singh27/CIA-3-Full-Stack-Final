import express from "express"
import Add_user from "./route_controllers/Add_user.js";
import Get_user from "./route_controllers/Get_user.js";
import Get_user_by_id from "./route_controllers/Get_user_by_id.js";
import Add_post from "./route_controllers/Add_post.js";
import Get_post from "./route_controllers/Get_post.js";
import Get_user_posts from "./route_controllers/Get_user_posts.js";
import Get_fyp from "./route_controllers/Get_fyp.js";
import Show_all_posts from "./route_controllers/Show_all_posts.js";
import Login_check from "./route_controllers/Login_check.js";
import Show_all_users from "./route_controllers/Show_all_users.js";
import Get_user_id from "./route_controllers/Get_user_id.js";
import Delete_user from "./route_controllers/Delete_user.js";
import Delete_post from "./route_controllers/Delete_post.js";
import Add_follower from "./route_controllers/Add_follower.js";
import Get_post_by_id from "./route_controllers/Get_post_by_id.js"
import Add_comment from "./route_controllers/Add_comment.js";
import Add_like from "./route_controllers/Add_like.js";
import Show_all_likes from "./route_controllers/Show_all_likes.js";
import Show_post_likes from "./route_controllers/Show_post_likes";
import Show_people_liked from "./route_controllers/Show_people_liked.js";
import Remove_like from "./route_controllers/Remove_like.js";
import Get_all_comments from "./route_controllers/Get_all_comments.js";
import Get_post_comments from "./route_controllers/Get_post_comments.js";
import Delete_comment from "./route_controllers/Delete_comment.js";
import Show_followers from "./route_controllers/Show_followers.js";
import Remove_follower from "./route_controllers/Remove_follower.js";
import Liked_posts from "./route_controllers/Liked_posts.js";

const router = express.Router();

router.get("/", (req, res) => {
    console.log("Hey")
    res.status(200).json({message: "Hey"});
})

router.post("/user/login/check", Login_check);
router.post("/user/add", Add_user);
router.post("/user/find_id", Get_user_id);
router.post("/user/delete", Delete_user);
router.post("/user/:usernameToFollow/follow", Add_follower);
router.post("/user/:usernameToUnFollow/unfollow", Remove_follower);
router.get("/user/followers/:username", Show_followers);
router.get("/users", Show_all_users);
router.get("/likes", Show_all_likes);
router.get("/posts", Show_all_posts);
router.get("/likes/:post_id", Show_post_likes);
router.get("/likedBy/:post_id", Show_people_liked);
router.post("/post/delete/", Delete_post);
router.get("/user/:name", Get_user);
router.get("/user_id/:id", Get_user_by_id);
router.post("/post/add", Add_post);
router.post("/post/add_like", Add_like);
router.post("/posts/", Get_post);
router.post("/post/:id", Get_post);
router.get("/posts/:username", Get_user_posts);
router.post("/fyp/", Get_fyp);
router.post("/post/add", Add_post);
router.get("/post/:id", Get_post_by_id);
router.post("/post/add_comment", Add_comment);
router.post("/post/add_like", Add_like);
router.get("/posts/liked/:username", Liked_posts);
router.post("/like/remove_like", Remove_like);
router.get("/comments", Get_all_comments);
router.get("/comments/:post_id", Get_post_comments);
router.post("/comments/add", Add_comment);
router.post("/comments/delete", Delete_comment);

export default router