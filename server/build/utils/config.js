"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.URL = exports.superuserId = exports.NodeEnv = exports.upload = exports.port = exports.MONGODB_URI = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const multer_1 = __importDefault(require("multer"));
dotenv_1.default.config();
const storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        const destinationPath = path_1.default.join(__dirname, "..", "..", "public", "uploads");
        cb(null, destinationPath);
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    },
});
const upload = (0, multer_1.default)({
    storage,
    limits: {
        fileSize: 5 * 1024 * 1024,
    },
});
exports.upload = upload;
const port = process.env.PORT || 8000;
exports.port = port;
const URL = process.env.HOST_URL;
exports.URL = URL;
const NodeEnv = process.env.NODE_ENV;
exports.NodeEnv = NodeEnv;
const superuserId = process.env.SUPERUSER_ID;
exports.superuserId = superuserId;
const MONGODB_URI = process.env.MONGODB_URI;
exports.MONGODB_URI = MONGODB_URI;
//# sourceMappingURL=config.js.map