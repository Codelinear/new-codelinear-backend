const mysql = require("mysql");

const pool = mysql.createPool({
  host: "217.21.87.205",
  user: "u947451844_saif08",
  password: "u]1ro&X$1R",
  database: "u947451844_pages",
  connectionLimit: 20,
});

module.exports = pool;
