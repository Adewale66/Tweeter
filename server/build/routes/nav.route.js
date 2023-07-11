"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const Token_1 = require("../middleware/Token");
const nav_controller_1 = require("../controllers/nav.controller");
const navRouter = express_1.default.Router();
navRouter.get("/explore", (0, express_async_handler_1.default)(nav_controller_1.getExploreTweets));
navRouter.use(Token_1.getRefreshToken);
navRouter.get("/home", (0, express_async_handler_1.default)(nav_controller_1.getHomeTweets));
navRouter.get("/bookmarks", (0, express_async_handler_1.default)(nav_controller_1.getSavedTweets));
exports.default = navRouter;
//# sourceMappingURL=nav.route.js.map