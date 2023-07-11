"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.followUserApiLimiter = exports.updateProfileApiLimiter = exports.updateTweetApiLimiter = exports.createTweetApiLimiter = exports.registerApiLimiter = exports.loginApiLimiter = void 0;
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const loginApiLimiter = (0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000,
    max: 5,
    message: "Too many login attempts from this IP, please try again after 15 minutes",
    standardHeaders: true,
    legacyHeaders: true,
    skipSuccessfulRequests: true,
});
exports.loginApiLimiter = loginApiLimiter;
const registerApiLimiter = (0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000,
    max: 10,
    message: "Too many register attempts, please try again after 15 minutes",
    standardHeaders: true,
    legacyHeaders: true,
    skipSuccessfulRequests: true,
});
exports.registerApiLimiter = registerApiLimiter;
const createTweetApiLimiter = (0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000,
    max: 20,
    message: "Rate limit exceeded, please try again after a while",
    standardHeaders: true,
    legacyHeaders: true,
    skipFailedRequests: true,
});
exports.createTweetApiLimiter = createTweetApiLimiter;
const updateTweetApiLimiter = (0, express_rate_limit_1.default)({
    windowMs: 20 * 60 * 1000,
    max: 50,
    message: "Rate limit exceeded, please try again after 15 minutes",
    standardHeaders: true,
    legacyHeaders: true,
    skipFailedRequests: true,
});
exports.updateTweetApiLimiter = updateTweetApiLimiter;
const followUserApiLimiter = (0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000,
    max: 20,
    message: "Too many follow attempts, please try again after 15 minutes",
    standardHeaders: true,
    legacyHeaders: true,
    skipFailedRequests: true,
});
exports.followUserApiLimiter = followUserApiLimiter;
const updateProfileApiLimiter = (0, express_rate_limit_1.default)({
    windowMs: 10 * 60 * 1000,
    max: 3,
    message: "Too many profile update attempts, please try again after 10 minutes",
    standardHeaders: true,
    legacyHeaders: true,
    skipFailedRequests: true,
});
exports.updateProfileApiLimiter = updateProfileApiLimiter;
//# sourceMappingURL=ratelimitmiddleware.js.map