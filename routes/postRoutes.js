const express = require("express");
const {
  getPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
} = require("../controllers/postController");

const router = express.Router();

//GET all posts
router.get("/list", getPosts);

//GET post by id
router.get("/list/:id", getPostById);

//CREATE post
router.post("/create", createPost);

//DELETE post
router.delete("/delete/:id", deletePost);

//UPDATE post
router.put("/update/:id", updatePost);

module.exports = router;
