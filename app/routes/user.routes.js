import Express from "express";
import users from "../controllers/users.controller.js";

const route = Express.Router();

const {
  loginUser,
  createUser,
  getAllUsers,
  deleteUserById,
  getUserByUserName,
  updateUserByUserName,
} = users;

route.get("/", getAllUsers);

route.post("/login", loginUser);

route.post("/signUp", createUser);

route.delete("/:id", deleteUserById);

route.get("/:user_name", getUserByUserName);

route.patch("/:user_name", updateUserByUserName);

export default route;
