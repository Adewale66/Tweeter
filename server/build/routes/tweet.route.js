"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const tweet_controller_1 = require("../controllers/tweet.controller");
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const comment_controller_1 = require("../controllers/comment.controller");
const config_1 = require("../utils/config");
const imageMiddleware_1 = require("../middleware/imageMiddleware");
const ratelimitmiddleware_1 = require("../middleware/ratelimitmiddleware");
const Token_1 = __importDefault(require("../middleware/Token"));
const tweetRouter = express_1.default.Router();
tweetRouter.get("/", (0, express_async_handler_1.default)(tweet_controller_1.getAllTweets));
tweetRouter.get("/:id", (0, express_async_handler_1.default)(tweet_controller_1.getTweet));
tweetRouter.use(Token_1.default);
tweetRouter.post("/", ratelimitmiddleware_1.createTweetApiLimiter, config_1.upload.single("file"), (0, express_async_handler_1.default)(imageMiddleware_1.validateTweetImage), (0, express_async_handler_1.default)(tweet_controller_1.createTweet));
tweetRouter.use(ratelimitmiddleware_1.updateTweetApiLimiter);
tweetRouter.post("/:postId/like", (0, express_async_handler_1.default)(tweet_controller_1.likeTweet));
tweetRouter.post("/:postId/removeLike", (0, express_async_handler_1.default)(tweet_controller_1.removeLike));
tweetRouter.post("/:postId/retweet", (0, express_async_handler_1.default)(tweet_controller_1.createRetweet));
tweetRouter.post("/:postId/removeRetweet", (0, express_async_handler_1.default)(tweet_controller_1.deleteRetweet));
tweetRouter.post("/:postId/bookmark", (0, express_async_handler_1.default)(tweet_controller_1.bookmarkTweet));
tweetRouter.post("/:postId/removeBookmark", (0, express_async_handler_1.default)(tweet_controller_1.removeBookmark));
tweetRouter.post("/:id/comment", (0, express_async_handler_1.default)(comment_controller_1.makeComment));
exports.default = tweetRouter;
//# sourceMappingURL=tweet.route.js.map