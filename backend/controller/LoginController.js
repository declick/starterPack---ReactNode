import bcrypt from 'bcrypt';
import { asyncQuery } from '../config/database.js';
import { generateToken } from "../auth/Token.js"

const validRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const getUserData = async (email) => {
	try {
		if (!email.match(validRegex)) {
			throw new Error("Adresse e-mail invalide");
		}
		const getUserSQL = "SELECT * FROM user WHERE email = ?";
		const userDataSQL = await asyncQuery(getUserSQL, [email]);
		return userDataSQL[0];
	} catch (error) {
		throw new Error(`Erreur lors de la récupération des données utilisateur: ${error.message}`);
	}
}

const generateResponse = async (userDataSQL) => {
	try {
		const ADMIN_ROLE_ID = 1
		const admin = userDataSQL.role_id === ADMIN_ROLE_ID
		const userData = {
			user: true,
			admin,
			user_id: userDataSQL.id
		}
		const token = await generateToken(userData)
		return { response: true, user_id: userDataSQL.id, admin, token }
	} catch (error) {
		throw new Error(`Erreur lors de la génération de la réponse: ${error.message}`);
	}
}

const Login = async (req, res) => {
	try {
		const { mdp, email } = req.body;
		const failJson = { response: false, message: "Identifiant ou mot de passe incorrect" };
		const userDataSQL = await getUserData(email);
		if (!userDataSQL) {
			res.json(failJson);
			return;
		}
		const mdpMatch = await bcrypt.compare(mdp, userDataSQL.mdp);
		const response = mdpMatch ? await generateResponse(userDataSQL) : failJson;

		res.json(response);
	} catch (error) {
		res.status(500).json({ response: false, message: error.message });
	}
}

export default Login;
