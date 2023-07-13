"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logUserOut = exports.logUser = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const users_1 = __importDefault(require("../models/users"));
const Token_1 = require("../middleware/Token");
const config_1 = require("../utils/config");
/**
 * @desc log a user in
 * @route POST /login
 * @access Public
 */
const logUser = async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password)
        return res.status(400).json({ message: "Missing email or password" });
    const user = await users_1.default.findOne({ username }).collation({
        locale: "en",
        strength: 2,
    });
    if (!user)
        return res.status(400).json({ message: "User not found" });
    const { hashedPassword } = user;
    const correctPassword = await bcrypt_1.default.compare(password, hashedPassword);
    if (!correctPassword)
        return res.status(400).json({ message: "Invalid Crendentials" });
    const tokenUser = {
        username: user.username,
        id: user._id,
    };
    const access_token = (0, Token_1.generateAccessToken)(tokenUser);
    const refreshToken = (0, Token_1.generateRefreshToken)(tokenUser);
    res
        .status(200)
        .cookie("refresh_token", refreshToken, {
        httpOnly: true,
        secure: config_1.NodeEnv !== "development",
        sameSite: "strict",
        maxAge: 864000000,
    })
        .json({
        id: user._id,
        name: user.name,
        username: user.username,
        access_token: access_token,
        image: user.profileimage,
    });
};
exports.logUser = logUser;
/**
 * @desc log a user out
 * @route GET /logout
 * @access Private
 */
const logUserOut = async (req, res) => {
    res
        .clearCookie("refresh_token", {
        httpOnly: true,
        expires: new Date(0),
    })
        .status(200)
        .json({ message: "success" });
};
exports.logUserOut = logUserOut;
//# sourceMappingURL=login.controller.js.map