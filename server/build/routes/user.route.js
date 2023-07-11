"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("../controllers/user.controller");
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const Token_1 = __importDefault(require("../middleware/Token"));
const config_1 = require("../utils/config");
const ratelimitmiddleware_1 = require("../middleware/ratelimitmiddleware");
const userRouter = express_1.default.Router();
userRouter.get("/:id", (0, express_async_handler_1.default)(user_controller_1.getUser));
userRouter.get("/", (0, express_async_handler_1.default)(user_controller_1.getAllUsers));
userRouter.post("/", (0, express_async_handler_1.default)(user_controller_1.CreateUser));
userRouter.use(Token_1.default);
userRouter.put("/", config_1.upload.fields([
    { name: "banner", maxCount: 1 },
    { name: "profile", maxCount: 1 },
]), ratelimitmiddleware_1.updateProfileApiLimiter, (0, express_async_handler_1.default)(user_controller_1.updateUser));
userRouter.delete("/", (0, express_async_handler_1.default)(user_controller_1.deleteUser));
userRouter.use(ratelimitmiddleware_1.followUserApiLimiter);
userRouter.post("/:id/follow", (0, express_async_handler_1.default)(user_controller_1.followUser));
userRouter.post("/:id/unfollow", (0, express_async_handler_1.default)(user_controller_1.unFollowUser));
exports.default = userRouter;
//# sourceMappingURL=user.route.js.map