import { defaultState } from "./defaultState";
import { connectDB } from "./connect-db";

export async function initializeDB() {
  let db = await connectDB();

  db.query(
    "CREATE TABLE IF NOT EXISTS users (id VARCHAR(255), name VARCHAR(255), passwordHash VARCHAR(255),friends VARCHAR(255))",
    function (err, result) {
      if (err) {
        console.log("table created unseccesgully" + err);
      }
    }
  );
  db.query(
    "ALTER TABLE users ADD UNIQUE INDEX (id, name, passwordHash)",
    function (err, result) {
      if (err) {
        console.log("table unique unseccesgully" + err);
      }
    }
  );

  db.query(
    "CREATE TABLE IF NOT EXISTS `groups` (id VARCHAR(255), name VARCHAR(255), owner VARCHAR(255))",
    function (err, result) {
      if (err) {
        console.log("table created unseccesgully" + err);
      }
    }
  );
  db.query(
    "ALTER TABLE `groups` ADD UNIQUE INDEX (id, name, owner)",
    function (err, result) {
      if (err) {
        console.log("table unique unseccesgully" + err);
      }
    }
  );

  db.query(
    "CREATE TABLE IF NOT EXISTS tasks (name VARCHAR(255), id VARCHAR(255), `group` VARCHAR(255), owner VARCHAR(255), isComplete BOOL)",
    function (err, result) {
      if (err) {
        console.log("table created unseccesgully" + err);
      }
    }
  );
  db.query(
    "ALTER TABLE tasks ADD UNIQUE INDEX (name, id, owner)",
    function (err, result) {
      if (err) {
        console.log("table unique unseccesgully" + err);
      }
    }
  );

  db.query(
    "CREATE TABLE IF NOT EXISTS comments (id VARCHAR(255), owner VARCHAR(255), task VARCHAR(255), content VARCHAR(255))",
    function (err, result) {
      if (err) {
        console.log("table created unseccesgully" + err);
      }
    }
  );
  db.query(
    "ALTER TABLE comments ADD UNIQUE INDEX(id, owner, content)",
    function (err, result) {
      if (err) {
        console.log("table unique unseccesgully" + err);
      }
    }
  );

  let jasonData = defaultState["users"];
  let values = [];

  for (var i = 0; i < jasonData.length; i++) {
    values.push([
      jasonData[i].id,
      jasonData[i].name,
      jasonData[i].passwordHash,
    ]);
  }
  db.query(
    "INSERT IGNORE INTO users (id, name, passwordHash) VALUES ?",
    [values],
    function (err, res) {
      if (err) {
        console.info("Error" + err);
      }
    }
  );
  jasonData = defaultState["groups"];
  values = [];
  for (var i = 0; i < jasonData.length; i++) {
    values.push([jasonData[i].id, jasonData[i].name, jasonData[i].owner]);
  }
  db.query(
    "INSERT IGNORE INTO `groups` (id, name, owner) VALUES ?",
    [values],
    function (err, res) {
      if (err) {
        console.info("Error" + err);
      }
    }
  );

  jasonData = defaultState["tasks"];
  values = [];
  for (var i = 0; i < jasonData.length; i++) {
    values.push([
      jasonData[i].name,
      jasonData[i].id,
      jasonData[i].group,
      jasonData[i].owner,
      jasonData[i].isComplete,
    ]);
  }
  db.query(
    "INSERT IGNORE INTO tasks (name, id, `group`, owner, isComplete) VALUES ?",
    [values],
    function (err, res) {
      if (err) {
        console.info("Error" + err);
      }
    }
  );

  jasonData = defaultState["comments"];
  values = [];
  for (var i = 0; i < jasonData.length; i++) {
    values.push([
      jasonData[i].id,
      jasonData[i].owner,
      jasonData[i].task,
      jasonData[i].content,
    ]);
  }
  db.query(
    "INSERT IGNORE INTO comments (id, owner, task, content) VALUES ?",
    [values],
    function (err, res) {
      if (err) {
        console.info("Error" + err);
      }
    }
  );
}

initializeDB();
