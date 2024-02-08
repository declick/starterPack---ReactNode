// config/database.js

import mysql from "mysql"
import util from "util"

let pool = mysql.createPool({
	connectionLimit: 10000,
	host: "localhost",
	user: "root",
	password: "root",
	database: "reactnode",
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