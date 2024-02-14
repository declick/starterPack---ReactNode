// config/database.js

import mysql from "mysql"
import util from "util"
import dotenv from "dotenv";
dotenv.config();

let pool = mysql.createPool({
	connectionLimit: 10000,
	host: process.env.DB_HOST,
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_DATABASE,
  });

export const query = util.promisify(pool.query).bind(pool)

export const asyncQuery = async (sql, params) => {
	try {
		const rows = await query(sql, params)
		return rows
	} catch (err) {
		console.log(err)
	}
}

export default pool