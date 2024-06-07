import express from "express";
import { signup, login, logout } from "../controller/control.js";
const auth_zalupa = express.Router();

auth_zalupa.get("/login", login);

auth_zalupa.get("/signup",signup);

auth_zalupa.get("/logout",logout);

export default auth_zalupa