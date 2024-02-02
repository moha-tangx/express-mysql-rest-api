import db from "../database/db.js";
import Post from "../models/post.model.js";

const posts = {
  // for getting all posts from the database
  getAllPosts: (req, res) => {
    try {
      db.query(`SELECT * FROM posts`, (err, result) => {
        if (err) throw err;
        return res.json(result).status(200);
      });
    } catch (err) {
      res.json({ message: `server error :: ${err}` }).status(500);
    }
  },

  // for getting a posts by id from the database
  getPostById: (req, res) => {
    const id = req.params.id;
    try {
      db.query(`SELECT * FROM posts WHERE _id = ?`, id, (err, result) => {
        if (err) throw err;
        return res.json(result).status(200);
      });
    } catch (err) {
      res.json({ message: `server error :: ${err}` }).status(500);
    }
  },

  // for deleting a posts by id from the database
  deletePostById: (req, res) => {
    const id = req.params.id;
    db.query("DELETE FROM posts WHERE _id = ?", id, (err, result) => {
      if (err) throw err;
      res.json(result);
    });
  },

  // for updating a posts by id from the database
  updatePostById: (req, res) => {
    const id = req.params.id;
    const post = new Post(req.body);
    db.query(
      "UPDATE posts SET tittle = ?, excerpt = ?, date = ?, author = ?, body = ? WHERE _id = ?",
      [post.tittle, post.excerpt, post.date, post.author, post.body, id],
      (err, result) => {
        if (err) throw err;
        res.json(result).status(201);
      }
    );
  },

  // for creating a new posts ;
  createPost: (req, res) => {
    // Validate request
    if (!req.body) {
      res.status(400).json({
        message: "Content can not be empty!",
      });
    }

    const newPost = new Post(req.body);
    try {
      db.query("INSERT INTO posts SET ?", newPost, (err, result) => {
        if (err) {
          res.json({ message: `server error :: ${err}` }).status(500);
          throw err;
        }
        res.json(result).status(201);
      });
    } catch (err) {
      console.log(err);
    }
  },
};

export default posts;
