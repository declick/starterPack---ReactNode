import pool from '../config/database.js'
import formidable from "formidable"


const GetProfil = (req, res) => {
	const sql = "SELECT user.prenom,user.nom,user.email FROM user WHERE id = ?"
	pool.query(sql, [req.params.id], (err, result) => {
		if (err) throw err
		res.json({ response: true, SQL: result[0] })
	})

}

const EditProfil = (req, res) => {
	const form = formidable({ keepExtensions: true })
	form.parse(req, (err, fields, files) => {
		if (err) throw err
		const UpdateUser = "UPDATE user SET prenom = ?,nom = ?,  email = ? WHERE id = ?"
		pool.query(UpdateUser, [fields.prenom, fields.nom, fields.email, fields.id], (err, result) => {
			if (err) throw err
			res.json({ response: true, message: "Update utilisateur" })
		})
	})
}
const DeleteUser = (req, res) => {
	const deleteUser = "DELETE FROM user WHERE id = ?"
	pool.query(deleteUser, [req.params.id], (err, deleteResult) => {
		if (err) throw err
		if (deleteResult) {
			res.json({ response: true, message: "suppression réussie", DELETE: deleteResult })
		}
	})
}

export { GetProfil, EditProfil, DeleteUser }