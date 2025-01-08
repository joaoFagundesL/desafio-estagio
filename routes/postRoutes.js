const express = require("express");
const {
  getPosts,
  getPostById,
  createPost,
} = require("../controllers/postController");

const router = express.Router();

//GET all posts
router.get("/list", getPosts);

//GET post by id
router.get("/list/:id", getPostById);

//CREATE post
router.post("/create", createPost);

//DELETE post

//UPDATE post
module.exports = router;
