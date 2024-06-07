const mysql = require("mysql2/promise");

async function connect() {
  try {
    const connection = await mysql.createConnection({
      host: process.env.MYSQL_HOST,
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DB_NAME,
    });
    return connection;
  } catch (err) {
    console.error("Error connecting to database:", err);
    throw err;
  }
}

module.exports = connect;
