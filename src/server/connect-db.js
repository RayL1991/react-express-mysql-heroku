import mysql from "mysql2";
import util from "util";

// task here: cannect the database with the web app;
export async function connectDB() {
  const con = mysql.createConnection({
    user: "b6489a090ddf28",
    host: "us-cdbr-east-05.cleardb.net",
    password: "c04a916b",
    //database: "myorganizer",
  });
  //mysql://b6489a090ddf28:c04a916b@us-cdbr-east-05.cleardb.net/heroku_ce1cbc38a974cf1?reconnect=true
  await con.promise().query("CREATE DATABASE IF NOT EXISTS myorganizer");
  con.end();

  const db = mysql.createConnection({
    user: "b6489a090ddf28",
    host: "us-cdbr-east-05.cleardb.net",
    password: "c04a916b",
    database: "myorganizer",
  });
  //console.info("successfully connect to the mysql db");
  return db;
}

//connectDB();
