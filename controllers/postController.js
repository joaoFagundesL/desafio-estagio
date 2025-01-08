//GEL all posts

const db = require("../config/db");

//GET all posts
const getPosts = async (req, res) => {
  try {
    const data = await db.query("SELECT * FROM Blog");

    if (data[0].length === 0) {
      return res.status(404).send({
        success: false,
        message: "Nothing to show :(",
      });
    }

    res.status(200).send({
      success: true,
      message: "Success :)",
      totalPosts: data[0].length,
      data: data[0],
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      message: "Error listing all posts :(",
      err,
    });
  }
};

//GET post by id
const getPostById = async (req, res) => {
  try {
    const postId = req.params.id;

    if (!postId) {
      return res.status(404).send({
        success: false,
        message: "Invalid!",
      });
    }

    const data = await db.query(`SELECT * FROM Blog WHERE idBlog=?`, [postId]);

    if (data[0].length === 0) {
      return res.status(404).send({
        success: false,
        message: "Nothing to show :(",
      });
    }

    res.status(200).send({
      success: true,
      postDetails: data[0],
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      message: "Error getting student by id :(",
      err,
    });
  }
};

const createPost = async (req, res) => {
  try {
    const { title, body, publicationDate } = req.body;

    if (!title || !body || !publicationDate) {
      return res.status(500).send({
        success: false,
        message: "Please fill all the fields!",
      });
    }

    const data = await db.query(
      `INSERT INTO Blog (title, body, publicationDate) VALUES (?, ?, ?)`,
      [title, body, publicationDate],
    );

    if (data[0].length === 0) {
      return res.status(404).send({
        success: false,
        message: "Error inserting data",
      });
    }

    res.status(201).send({
      success: true,
      message: "New post has been created!",
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      message: "Error creating student!",
      err,
    });
  }
};

module.exports = { getPosts, getPostById, createPost };
