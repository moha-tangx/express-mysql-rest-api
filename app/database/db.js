import mysql from "mysql";
import dbConfig from "../config/db.config.js";

const db = mysql.createConnection(dbConfig);

db.connect((err) => {
  if (err) {
    console.log("database connection error:: " + err);
    return;
  }
  console.log("database connection successful");
});

export default db;
