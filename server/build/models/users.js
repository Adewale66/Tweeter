"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const mongoose_unique_validator_1 = __importDefault(require("mongoose-unique-validator"));
const userSchema = new mongoose_1.Schema({
    name: String,
    username: {
        unique: true,
        required: true,
        type: String,
        uniqueCaseInsensitive: true,
    },
    hashedPassword: String,
    following: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "User",
        },
    ],
    followers: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "User",
        },
    ],
    description: {
        type: String,
        default: "",
    },
    profileimage: {
        type: String,
        default: "",
    },
    bannerImage: {
        type: String,
        default: "",
    },
    images: [{ url: String, timeMade: Date }],
    tweets: [
        {
            tweet: {
                type: mongoose_1.Schema.Types.ObjectId,
                ref: "Tweet",
            },
            liked: Boolean,
            saved: Boolean,
            retweeted: Boolean,
            timeMade: Date,
        },
    ],
});
userSchema.plugin(mongoose_unique_validator_1.default);
userSchema.set("toJSON", {
    transform: (document, r) => {
        r.id = r._id;
        delete r._id;
        delete r.__v;
        delete r.hashedPassword;
    },
});
exports.default = (0, mongoose_1.model)("User", userSchema);
//# sourceMappingURL=users.js.map