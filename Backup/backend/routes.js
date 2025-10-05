import express from "express"
import Add_user from "./route_controllers/Add_user.js";
import Get_user from "./route_controllers/Get_user.js";
import Get_user_by_id from "./route_controllers/Get_user_by_id.js";
import Add_post from "./route_controllers/Add_post.js";
import Get_post from "./route_controllers/Get_post.js";
import Get_user_posts from "./route_controllers/Get_user_posts.js";
import Update_post from "./route_controllers/Update_post.js";
import Get_fyp from "./route_controllers/Get_fyp.js";
import Add_location from "./route_controllers/Add_location.js";
import Get_location from "./route_controllers/Get_location.js";
import Delete_location from "./route_controllers/Delete_location.js";
import Show_all_locations from "./route_controllers/Show_all_locations.js";
import Update_location_rating from "./route_controllers/Update_location_rating.js"
import Show_all_posts from "./route_controllers/Show_all_posts.js";
import Login_check from "./route_controllers/Login_check.js";
import Show_all_users from "./route_controllers/Show_all_users.js";
import Get_user_id from "./route_controllers/Get_user_id.js";
import Delete_user from "./route_controllers/Delete_user.js";
import Delete_post from "./route_controllers/Delete_post.js";
import Add_follower from "./route_controllers/Add_follower.js";

const router = express.Router();

router.get("/", (req, res) => {
    console.log("Hey")
    res.status(200).json({message: "Hey"});
})

router.post("/user/login/check", Login_check);
router.post("/user/add", Add_user);
router.post("/user/find_id", Get_user_id);
router.post("/user/delete", Delete_user);
router.post("/user/follow", Add_follower);
router.get("/users", Show_all_users);
router.get("/posts", Show_all_posts);
router.get("/post/delete/:id", Delete_post);
router.get("/users/:name", Get_user);
router.get("/user_id/:id", Get_user_by_id);
router.post("/post/add", Add_post);
router.post("/posts/", Get_post);
router.post("/fyp/", Get_fyp);
router.post("/post/add", Add_post);
router.get("/posts/", Show_all_posts);
// router.post("/locations/add", Add_location);
// router.get("/locations/:id", Get_location);
// router.get("/locations/delete/:id", Delete_location);
// router.get("/locations/update_rating/:id", Update_location_rating);
// router.get("/locations/", Show_all_locations);

export default router