import jwt from "jsonwebtoken"

const privateKey = process.env.TOKEN

export const generateToken = async (userData) => {
	const Token = await jwt.sign(userData, privateKey)
	return Token
}

export const verifyToken = async (Token) => {
	try {
		if (Token) {
			const jwtToken = await jwt.verify(Token, privateKey)
			return jwtToken
		} else {
			return undefined
		}
	}
	catch (err) {
		return undefined
	}
}