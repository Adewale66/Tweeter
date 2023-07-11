"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const compression_1 = __importDefault(require("compression"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const user_route_1 = __importDefault(require("./routes/user.route"));
const log_route_1 = require("./routes/log.route");
const errorHandler_1 = __importDefault(require("./middleware/errorHandler"));
const morgan_1 = __importDefault(require("morgan"));
const tweet_route_1 = __importDefault(require("./routes/tweet.route"));
const checkToken_route_1 = __importDefault(require("./routes/checkToken.route"));
const nav_route_1 = __importDefault(require("./routes/nav.route"));
const config_1 = require("./utils/config");
const http_errors_1 = __importDefault(require("http-errors"));
const path_1 = __importDefault(require("path"));
console.log(config_1.NodeEnv, "nodeenv");
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    credentials: true,
}));
app.use((0, helmet_1.default)({
    crossOriginResourcePolicy: {
        policy: "cross-origin",
    },
    contentSecurityPolicy: {
        useDefaults: true,
        ...helmet_1.default.contentSecurityPolicy.getDefaultDirectives(),
        directives: {
            "img-src": [
                "'self'",
                "blob:",
                "data:",
                "http://localhost:8000",
                `${config_1.URL}`,
            ],
        },
    },
}));
app.use((0, compression_1.default)());
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
if (config_1.NodeEnv === "production") {
    app.set("trust proxy", true);
    app.use((0, morgan_1.default)("combined"));
}
else {
    app.use((0, morgan_1.default)("dev"));
}
app.use(express_1.default.static("public"));
app.use("/api", log_route_1.logRouter);
app.use("/api", checkToken_route_1.default);
app.use("/api/user", user_route_1.default);
app.use("/api/tweet", tweet_route_1.default);
app.use("/api", nav_route_1.default);
if (config_1.NodeEnv === "production") {
    const __dirname = path_1.default.resolve();
    app.use(express_1.default.static(path_1.default.join(__dirname, "../client/dist")));
    app.get("*", (req, res) => res.sendFile(path_1.default.resolve(__dirname, "../client", "dist", "index.html")));
}
else
    app.get("/", (req, res) => res.send("Server is running!"));
app.use((req, res, next) => next((0, http_errors_1.default)(404, "Endpoint not found")));
app.use(errorHandler_1.default);
exports.default = app;
//# sourceMappingURL=app.js.map