import jwt from "jsonwebtoken"

const generateTokenAndSetCoockie = (userId, res) => {
    const token = jwt.sign({userId}, process.env.JWT_SECRET, {
       expiresIn: '15d'
    });

    res.cookie("jwt",token, {
        maxAge: 15 * 24 * 60 * 60 * 1000,
        httpOnly: true, // JS-XSS атаки (скрипты)
        sameSite:"strict", // CSRF атаки дефает
        secure: process.env.NODE_ENV !== "development" // когда на сервак залью ставлю тру потому что через http не секьюр
    });
};

export default generateTokenAndSetCoockie;