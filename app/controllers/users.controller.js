import db from "../database/db.js";
import User from "../models/users.model.js";
import { hash, compare } from "../utils/enc.js";

const users = {
  // for creating a new users ;
  createUser: (req, res) => {
    // Validate request
    if (!req.body) {
      res.status(400).json({
        message: "Content can not be empty!",
      });
    }
    const user = {
      name: req.body.name,
      user_name: req.body.user_name,
      password: hash(req.body.password),
      email: req.body.email,
    };
    // create new user
    const newUser = new User(user);
    db.query("INSERT INTO users SET ?", newUser, (err, result) => {
      if (err) {
        res.status(500).json({ error_message: err.sqlMessage });
      }
      res.status(201).json(result);
    });
  },

  // for getting all users from the database
  getAllUsers: (req, res) => {
    db.query(`SELECT * FROM users`, (err, result) => {
      if (err) res.status(500).json({ err: err.sqlMessage });
      return res.status(200).json(result);
    });
  },

  getUserByUserName: (req, res) => {
    const user_name = req.params.user_name;
    db.query(
      `SELECT * FROM users WHERE user_name = ?`,
      user_name,
      (err, result) => {
        if (err) res.status(500).json({ err: err.sqlMessage });
        return res.status(200).json(result);
      }
    );
  },

  // logging in a user
  loginUser: (req, res) => {
    const ReqUser = {
      user_name: req.body.user_name,
      password: req.body.password,
    };
    db.query(
      `SELECT * FROM users WHERE user_name = ?`,
      ReqUser.user_name,
      (err, result) => {
        if (err) res.status(500).json({ err: err.sqlMessage });
        if (result.length) {
          const correctPassword = compare(result[0].password, ReqUser.password);
          return correctPassword
            ? res.status(200).json(result)
            : res
                .status(400)
                .json({ message: "username or password is not correct" });
        }
        res.status(404).json({ message: "username doesn't match any user" });
      }
    );
  },

  updateUserByUserName: (req, res) => {
    const user_name = req.params.user_name;
    db.query(
      `SELECT * FROM users WHERE user_name = ? `,
      user_name,
      (err, result) => {
        const user = result[0];
        if (user) {
          const newUser = {
            name: req.body.name || user.name,
            user_name: req.body.user_name || user.user_name,
            password: req.body.password
              ? hash(req.body.password)
              : user.password,
            email: req.body.email || user.email,
          };
          db.query(
            "UPDATE users SET name = ?, user_name = ?, password = ?, email = ? WHERE user_name = ?",
            [
              newUser.name,
              newUser.user_name,
              newUser.password,
              newUser.email,
              user_name,
            ],
            (err, result) => {
              if (err) throw err;
              res.status(201).json(result);
            }
          );
        } else res.json({ message: "user not found" });
      }
    );
  },

  // for deleting a users by id from the database
  deleteUserById: (req, res) => {
    const id = req.params.id;
    db.query("DELETE FROM users WHERE _id = ?", id, (err, result) => {
      if (err) res.status(500).json({ err: err.sqlMessage });
      res.status(202).json(result);
    });
  },
};

export default users;
