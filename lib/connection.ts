import mysql, { Pool } from "mysql2/promise";

let pool: Pool;

export async function getConnection() {
  if (!pool) {
    pool = mysql.createPool({
      host: "localhost",
      user: "dbroot",
      password: "mysqldba",
      database: "synrgiselmsdata",
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
    });
  }

  return await pool.getConnection();
}
