import Express from "express";
import posts from "../controllers/posts.controller.js";
const route = Express.Router();

const { getAllPosts, createPost, getPostById, updatePostById, deletePostById } =
  posts;

route.get("/", getAllPosts);

route.post("/", createPost);

route.get("/:id", getPostById);

route.patch("/:id", updatePostById);

route.delete("/:id", deletePostById);

export default route;
