import { Router } from "express";
import {
  getPost,
  getPosts,
  getFeed,
  getLandFeed,
  createPost,
  removePost,
} from "../controllers/post.controllers.js";

const router = Router();

router.get("/posts", getPosts);
router.get("/posts/feed", getFeed);
router.get("/posts/landfeed", getLandFeed);
router.post("/posts", createPost);
router.get("/posts/:id", getPost);
router.delete("/posts/:id", removePost);

export default router;
