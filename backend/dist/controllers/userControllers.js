import User from "../models/userSchema.js";
import { hash, compare } from "bcrypt";
import { createToken } from "../utils/tokenManager.js";
import { COOKIE_NAME } from "../utils/constants.js";
export const getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find();
        return res.status(200).json({
            success: true,
            users,
        });
    }
    catch (err) {
        return res.status(200).json({
            success: false,
            message: "error",
            cause: err.messsage
        });
    }
};
export const userSignup = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;
        const userExists = await User.findOne({ email: email });
        if (userExists) {
            return res.status(401).send("user already exists");
        }
        const hasshedPassword = await hash(password, 10);
        const user = new User({ name, email, password: hasshedPassword });
        await user.save();
        res.clearCookie(COOKIE_NAME, {
            httpOnly: true,
            signed: true,
            domain: "localhost",
            path: "/",
        });
        const token = createToken(user._id.toString(), user.email, "7d");
        let expires = new Date();
        expires.setDate(expires.getDate() + 7);
        res.cookie("auth_token", token, {
            path: "/",
            domain: "localhost",
            expires,
            httpOnly: true,
            signed: true,
        });
        return res.status(200).json({
            success: true,
            id: user._id.toString(),
            name: user.name,
            email: user.email,
        });
    }
    catch (err) {
        return res.status(200).json({
            success: false,
            message: "cant signup",
            cause: err.messsage
        });
    }
};
export const userLogin = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email: email });
        if (!user) {
            res.status(401).send("user not Exists");
        }
        const isPasswordCorecct = await compare(password, user.password);
        if (!isPasswordCorecct) {
            return res.status(403).send("incorrect Password");
        }
        res.clearCookie(COOKIE_NAME, {
            httpOnly: true,
            signed: true,
            domain: "localhost",
            path: "/",
        });
        const token = createToken(user._id.toString(), user.email, "7d");
        let expires = new Date();
        expires.setDate(expires.getDate() + 7);
        res.cookie("auth_token", token, {
            path: "/",
            domain: "localhost",
            expires,
            httpOnly: true,
            signed: true,
        });
        return res.status(200).json({
            success: true,
            message: "user login successful",
            name: user.name,
            email: user.email,
        });
    }
    catch (err) {
        return res.status(200).json({
            success: false,
            message: "cant signup",
            cause: err.messsage
        });
    }
};
export const verifyUser = async (req, res, next) => {
    try {
        const user = await User.findById(res.locals.jwtData.id);
        // console.log( "SDFGH",user._id,res.locals.jwtData.id)
        if (!user) {
            res.status(401).send("user not Exists or token Malifunctioning");
        }
        if (user._id.toString() !== res.locals.jwtData.id) {
            res.status(401).send("Permissions didnt match");
        }
        return res.status(200).json({
            success: true,
            message: "user login successful",
            name: user.name,
            email: user.email,
        });
    }
    catch (err) {
        return res.status(400).json({
            success: false,
            message: "cant signup",
            cause: err.messsage
        });
    }
};
export const userLogout = async (req, res, next) => {
    try {
        const user = await User.findById(res.locals.jwtData.id);
        if (!user) {
            res.status(401).send("user not Exists or token Malifunctioning");
        }
        if (user._id.toString() !== res.locals.jwtData.id) {
            res.status(401).send("Permissions didnt match");
        }
        res.clearCookie(COOKIE_NAME, {
            httpOnly: true,
            domain: "localhost",
            signed: true,
            path: "/"
        });
        return res.status(200).json({
            success: true,
            message: "user logout successful",
        });
    }
    catch (err) {
        return res.status(200).json({
            success: false,
            message: "cant logout",
            cause: err.messsage
        });
    }
};
//# sourceMappingURL=userControllers.js.map