import { Router } from "express";
import { getBook, getBookList } from "../controllers/book.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/list").get(verifyJWT, getBookList);
router.route("/:id").get(verifyJWT, getBook);

export default router;
