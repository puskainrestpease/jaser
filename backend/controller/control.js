import User from "../models/usermodel.js";
import bcryptjs from "bcryptjs";
import generateTokenAndSetCoockie from "../utils/token.js";

export const signup = async (req, res) => {
    try {
        const {fullname,username,pswd,cnfrmpswd,gen}= req.body;
        if(pswd !== cnfrmpswd) {
            return res.status(400).json({error:"Пароли не сходятся"});
        }

        const user = await User.findOne({username});

        if(user) {
            return res.status(400).json({error:"Пользователь s таким именем уже существует"});
        }
    
        const salt = await bcryptjs.genSalt(10);
        const hashpassword = await bcryptjs.hash(pswd, salt);

        const boyProfilePic = "https://w.forfun.com/fetch/55/555b79eae7d0011c8c27b117b7440d85.jpeg";
        const girlProfilePic = "https://img.razrisyika.ru/kart/61/1200/241448-volchica-38.jpg";

        const newUser = new User({
            fullname,
            username,
            password: hashpassword,
            gen,
            profilePic: gen === "male" ? boyProfilePic : girlProfilePic,
        });

        if (newUser){

            generateTokenAndSetCoockie(newUser._id, res);
            await newUser.save();

            res.status(201).json({
                _id: newUser._id,
                fullname: newUser.fullname,
                username: newUser.username,
                profilePic: newUser.profilePic,
                gen:newUser.gen,
            });
        } else {
            res.status(400).json({ error: "Инвалид юзер дата" });
        }

    } catch (error) {
        console.log("Пришла ошибка (/backend/controller/control.js signup):", error.message);
        res.status(500).json({error:"Ошибка на стороне сервера (логи отправлены в коносоль разработчику, скоро все решу!"});
    }
}

export const login = async (req, res) => {
    try {
        const {username, password} = req.body;
        const user = await User.findOne({username});
        const isPasswordCorrect = await bcryptjs.compare(password, user?.password || "");

        if (!user || !isPasswordCorrect) {
            return res.status(400).json({ error: "Неправильный пароль или логин"});
        }

        generateTokenAndSetCoockie(user._id, res);

        res.status(200).json({
            _id: user._id,
            fullname: user.fullname,
            username: user.username,
            profilePic: user.profilePic,
        })
    } catch (error) {
        console.log("Пришла ошибка (/backend/controller/control.js login):", error.message);
        res.status(500).json({error:"Ошибка на стороне сервера (логи отправлены в коносоль разработчику, скоро все решу!"});
    }
}

export const logout = (req, res) => {
    try {
        res.cookie("jwt","", {maxAge:0});
        res.status(200).json({message:"Вышел из аккаунта успешно!"});
    } catch (error) {
        console.log("Пришла ошибка (/backend/controller/control.js logout):", error.message);
        res.status(500).json({error:"Ошибка на стороне сервера (логи отправлены в коносоль разработчику, скоро все решу!"});
    }
}