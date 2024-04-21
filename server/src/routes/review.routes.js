import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { getReviewList, reviewUpdate,addFavourite } from "../controllers/review.controller.js";

const router = Router();

router.route("/list").get(verifyJWT, getReviewList);
router.route("/reviewUpdate").post(verifyJWT, reviewUpdate);
router.route("/addFav").put(verifyJWT,addFavourite);

export default router;
