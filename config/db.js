const mysql = require("mysql2/promise");

const mysqlPool = mysql.createPool({
  host: "localhost",
  user: "juca",
  password: "hack09exe",
  database: "blog_db",
});

module.exports = mysqlPool;
