"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const checkToken_controller_1 = require("../controllers/checkToken.controller");
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const tokenRouter = express_1.default.Router();
tokenRouter.post("/checkToken", (0, express_async_handler_1.default)(checkToken_controller_1.checkToken));
exports.default = tokenRouter;
//# sourceMappingURL=checkToken.route.js.map