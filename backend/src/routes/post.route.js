import express from "express";
import {
  createPost,
  deletePost,
  getPost,
  getPosts,
  getUserPosts,
  likePost,
} from "../controllers/post.controller.js";
import { protectedRoute } from "../middleware/auth.middleware.js";
import upload from "../middleware/upload.middleware.js";

const router = express.Router();

// public routes
router.get("/", getPosts);
router.get("/:postId", getPost);
router.get("/user/:username", getUserPosts);

// protected proteced
router.post("/", protectedRoute, upload.single("image"), createPost);
router.post("/:postId/like", protectedRoute, likePost);
router.delete("/:postId", protectedRoute, deletePost);

export default router;