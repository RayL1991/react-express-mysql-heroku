import mysql from "mysql2";

// task here: cannect the database with the web app;
export async function connectDB() {

  // const db = mysql.createConnection({
  //   user: "root",
  //   host: "localhost",
  //   password: "password",
  //   database: "myorganizer",
  // });
  const db = mysql.createPool({
    user: "uuuuuuuuuuuuuuu",
    host: "us-cdbr-east-05.cleardb.net",
    password: "pppppppppppppppp",
    database: "heroku_ce1cbc38a974cf1",
  });
  //console.info("successfully connect to the mysql db");
  return db;
}

//connectDB();
