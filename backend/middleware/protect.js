import jwt from "jsonwebtoken";
import userSchema from "../models/usermodel.js";

const protectRoute = async (req, res, next) => {
	try {
		const token = req.cookies.jwt;

		if (!token) {
			return res.status(401).json({ error: "не авторизовало - токен не указан!" });
		}

		const decoded = jwt.verify(token, process.env.JWT_SECRET);

		if (!decoded) {
			return res.status(401).json({ error: "не авторизовало - невалидный токен" });
		}

		const user = await userSchema.findById(decoded.userId).select("-password");

		if (!user) {
			return res.status(404).json({ error: "Пользователь не найден!" });
		}

		req.user = user;

		next();
	} catch (error) {
		console.log("Ошибка протектроут миддлевейр: ", error.message);
		res.status(500).json({ error: "внутреняя ошибка сервера" });
	}
};

export default protectRoute;