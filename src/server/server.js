import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { connectDB } from "./connect-db";

import { initializeDB } from "./initialize-db";
import { authenticationRoute } from "./authenticate";
import path from "path";

let port = process.env.PORT || 8888;
let app = express();
initializeDB();

// app.get("/", (req, res) => {
//   res.send("hello world !!!!");
// });
app.use(cors(), bodyParser.urlencoded({ extended: true }), bodyParser.json());
app.listen(port, console.log("Server listening on port", port));
authenticationRoute(app);

if (process.env.NODE_ENV == "production") {
  app.use(express.static(path.resolve(__dirname, "../../dist")));
  app.get("/*", (req, res) => {
    res.sendFile(path.resolve("index.html"));
  });
}

export const addNewTask = async (task) => {
  let db = await connectDB();
  let { name, id, group, owner, isComplete } = task;
  // let collection = db.collection("tasks");
  // await collection.insertOne(task);
  db.query(
    "INSERT INTO tasks VALUES (?,?,?,?,?)",
    [name, id, group, owner, isComplete],
    function (err, res) {
      if (err) {
        console.info("Error in insert taks: " + err);
      }
    }
  );
};

export const addNewUser = async (user) => {
  let db = await connectDB();
  // let collection = db.collection("users");
  // await collection.insertOne(user);
  let { username, password, id } = user;
  db.query(
    "INSERT INTO users (id, name, passwordHash) VALUES (?,?,?)",
    [id, username, password],
    function (err, res) {
      if (err) {
        console.info("Error in user insert : " + err);
      }
    }
  );
};
export const updateTask = async (task) => {
  let { id, group, isComplete, name } = task;
  let db = await connectDB();
  //let collection = db.collection("tasks");

  if (group) {
    //await collection.updateOne({ id }, { $set: { group } });
    db.query(
      "UPDATE tasks SET `group`=? WHERE id=?",
      [group, id],
      function (err, res) {
        if (err) {
          console.info("Error happend in group update:", err);
        }
      }
    );
  }
  if (name) {
    db.query(
      "UPDATE tasks SET name=? WHERE id=?",
      [name, id],
      function (err, res) {
        if (err) {
          console.info("Error happend in name update: ", err);
        }
      }
    );
  }
  if (isComplete !== undefined) {
    //await collection.updateOne({ id }, { $set: { isComplete } });
    db.query(
      "UPDATE tasks SET isComplete=? WHERE id=?",
      [isComplete, id],
      function (err, res) {
        if (err) {
          console.info("Error happend in isComplete update: " + err);
        }
      }
    );
  }
};

app.post("/task/new", async (req, res) => {
  let task = req.body.task;
  await addNewTask(task);
  res.status(200).send();
});
app.post("/task/update", async (req, res) => {
  let task = req.body.task;
  await updateTask(task);
  res.status(200).send();
});

app.post("/user/new", async (req, res) => {
  let user = req.body.user;
  await addNewUser(user);
  res.status(200).send();
});
