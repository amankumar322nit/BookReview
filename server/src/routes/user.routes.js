import { Router } from "express";
import {
  getallfav,
  loginUser,
  logoutUser,
  refreshAccessToken,
  registerUser,
  userData,
} from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/register").post(registerUser);

router.route("/login").post(loginUser);

router.route("/logout").get(verifyJWT, logoutUser);

router.route("/refresh-token").post(refreshAccessToken);

router.route("/").get(verifyJWT,userData);

router.route('/fav').get(verifyJWT, getallfav)

export default router;
