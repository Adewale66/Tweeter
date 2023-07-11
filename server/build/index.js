"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const app_1 = __importDefault(require("./app"));
const config_1 = require("./utils/config");
mongoose_1.default
    .connect(config_1.MONGODB_URI)
    .then(() => {
    console.log("db connected");
})
    .catch((error) => {
    console.log(error);
});
app_1.default.listen(config_1.port, () => {
    console.log(`server on port http://localhost/${config_1.port}/api`);
});
//# sourceMappingURL=index.js.map