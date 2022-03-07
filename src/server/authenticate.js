import { v4 as uuidv4 } from "uuid";
import md5 from "md5";
import { connectDB } from "./connect-db";

const authenticationTokens = [];

async function assembleUserState(user) {
  let db = await connectDB();
  //let tasks = await db.collection("tasks").find({ owner: user.id }).toArray();

  let resTasksData = await db
    .promise()
    .query(
      "SELECT * FROM ?? WHERE owner=?",
      [`tasks`, user.id],
      function (err, rows, fields) {
        if (err) {
          console.log("check if there is problem??", err);
        }
      }
    );

  let resGroupData = await db
    .promise()
    .query(
      "SELECT * FROM ?? WHERE owner=?",
      [`groups`, user.id],
      function (err, rows, fields) {
        if (err) {
          console.log("check if there is problem??", err);
        }
      }
    );

  let tasks = resTasksData[0];
  let groups = resGroupData[0];

  return {
    tasks,
    groups,
    session: { authenticated: "AUTHENTICATED", id: user.id },
  };
}

export const authenticationRoute = (app) => {
  app.post("/authenticate", async (req, res) => {
    let { username, password } = req.body;
    let db = await connectDB();
    let resData = await db
      .promise()
      .query(
        "SELECT * FROM users WHERE name=?",
        username,
        function (err, rows, fields) {
          if (err) {
            console.log("check if there is problem in authentation ", err);
          }
        }
      );
    let user = resData[0];

    if (!user.length) {
      return res.status(500).send("User not found");
    }

    let hash = md5(password);
    let passwordCorrect = hash === user[0].passwordHash;
    if (!passwordCorrect) {
      return res.status(500).send("password incorrect");
    }

    let token = uuidv4();
    authenticationTokens.push({
      token,
      userID: user[0].id,
    });
    let state = await assembleUserState(user[0]);

    res.send({ token, state });
  });
};
