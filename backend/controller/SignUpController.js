import pool from '../config/database.js';
import bcrypt from 'bcrypt';

const saltRounds = 10;
const MIN_PASSWORD_LENGTH = 8;
const MAX_FIELD_LENGTH = 255;

const isValidEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
};

const isValidFieldLength = (field) => {
    return field.length <= MAX_FIELD_LENGTH;
};

const SignUp = (req, res) => {
    const { prenom, nom, email, mdp } = req.body;
    const verifSql = "SELECT email FROM user WHERE email = ?";
    if (isValidEmail(email)) {
        if (isValidFieldLength(prenom) && isValidFieldLength(nom) && isValidFieldLength(email)) {
            if (mdp.length >= MIN_PASSWORD_LENGTH) {
                pool.query(verifSql, [email], async (err, verifresult) => {
                    if (err) {
                        return res.status(500).json({ response: false, message: "Erreur interne du serveur" });
                    }
                    if (verifresult[0]) {
                        return res.json({ response: false, message: "Erreur d'e-mail" });
                    }
                    const hash = await bcrypt.hash(mdp, saltRounds);
                    const sql = "INSERT INTO user (role_id, prenom, nom, email, mdp, registration_date) VALUES (2,?,?,?,?,?)";
                    pool.query(sql, [prenom, nom, email, hash, new Date()], (err, result) => {
                        if (err) {
                            return res.status(500).json({ response: false, message: "Erreur interne du serveur" });
                        }
                        res.json({ response: true });
                    });
                });
            } else {
                res.json({ response: false, message: "Merci de mettre un mot de passe plus long" });
            }
        } else {
            res.json({ response: false, message: "Les champs sont trop longs" });
        }
    } else {
        res.json({ response: false, message: "Adresse e-mail invalide" });
    }
};

export default SignUp;
