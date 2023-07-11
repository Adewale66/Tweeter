"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logRouter = void 0;
const express_1 = __importDefault(require("express"));
const login_controller_1 = require("../controllers/login.controller");
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const Token_1 = __importDefault(require("../middleware/Token"));
const ratelimitmiddleware_1 = require("../middleware/ratelimitmiddleware");
const logRouter = express_1.default.Router();
exports.logRouter = logRouter;
logRouter.post("/login", ratelimitmiddleware_1.loginApiLimiter, (0, express_async_handler_1.default)(login_controller_1.logUser));
logRouter.post("/logout", Token_1.default, (0, express_async_handler_1.default)(login_controller_1.logUserOut));
//# sourceMappingURL=log.route.js.map