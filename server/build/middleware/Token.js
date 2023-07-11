"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.generateAccessToken = exports.generateRefreshToken = exports.getRefreshToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const getAccessToken = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (!token)
        return res.status(401).json({ message: "Unauthorized" });
    jsonwebtoken_1.default.verify(token, process.env.TOKEN_SECRET, (err, user) => {
        if (err)
            next(err);
        req.user = user;
        next();
    });
};
const getRefreshToken = (req, res, next) => {
    const token = req.cookies.refresh_token;
    if (!token)
        return res.status(401).json({ message: "Unauthorized" });
    jsonwebtoken_1.default.verify(token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if (err)
            next(err);
        req.user = user;
        next();
    });
};
exports.getRefreshToken = getRefreshToken;
const generateRefreshToken = (payload) => {
    const refreshToken = jsonwebtoken_1.default.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: "10 days",
    });
    return refreshToken;
};
exports.generateRefreshToken = generateRefreshToken;
const generateAccessToken = (payload) => {
    const accessToken = jsonwebtoken_1.default.sign(payload, process.env.TOKEN_SECRET, {
        expiresIn: "2h",
    });
    return accessToken;
};
exports.generateAccessToken = generateAccessToken;
const verifyToken = (token, type) => {
    let valid;
    if (type === "access")
        jsonwebtoken_1.default.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
            if (err)
                valid = false;
            else
                valid = true;
        });
    else
        jsonwebtoken_1.default.verify(token, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
            if (err)
                valid = false;
            else
                valid = true;
        });
    return valid;
};
exports.verifyToken = verifyToken;
exports.default = getAccessToken;
//# sourceMappingURL=Token.js.map