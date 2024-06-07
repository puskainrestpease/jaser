import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const protectRoute = async (req, res, next) => {
	try {
		const token = req.cookies.jwt;

		if (!token) {
			return res.status(401).json({ error: "не авторизовался - нет токена" });
		}

		const decoded = jwt.verify(token, process.env.JWT_SECRET);

		if (!decoded) {
			return res.status(401).json({ error: "не авторизовался - токен невалид" });
		}

		const user = await User.findById(decoded.userId).select("-password");

		if (!user) {
			return res.status(404).json({ error: "пользователь не найден" });
		}

		req.user = user;

		next();
	} catch (error) {
		console.log("Ошибка в защите protectroute: ", error.message);
		res.status(500).json({ error: "ошибка сервера 500" });
	}
};

export default protectRoute;
