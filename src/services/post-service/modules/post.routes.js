// post.routes.js

const express = require("express");
const router = express.Router();
const postController = require("./post.controller");
const postMiddleware = require("./post.middleware"); // Import middleware if needed

// Endpoint to create a new post
router.post(
  "/posts",
  postMiddleware.validatePostData,
  postController.createPost
);

// Endpoint to get all posts
router.get("/posts", postController.getAllPosts);

module.exports = router;
