import Express from "express";
// import { configDotenv } from "dotenv";// deprecated....//
import postsRoute from "./app/routes/posts.routes.js";
import usersRoute from "./app/routes/user.routes.js";

// enviromrnt variables configuration deprecated....
// configDotenv();

const PORT = process.env.PORT || 8080;

const app = Express();
app.use(Express.json());

app.listen(PORT, () => console.log(`listening on http://localhost:${PORT}`));

// server test route...
app.get("/", (req, res) => {
  res.json({ message: "hello mysql" });
});

// posts routes
app.use("/posts", postsRoute);

// users route
app.use("/users", usersRoute);
