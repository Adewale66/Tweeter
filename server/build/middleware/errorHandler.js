"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_errors_1 = require("http-errors");
const errorHandler = (error, req, res, next) => {
    if (error.name === "CastError") {
        return res.status(400).send({ error: "malformatted id" });
    }
    else if (error.name === "ValidationError") {
        return res.status(400).json({ error: error.name });
    }
    else if (error.name === "JsonWebTokenError") {
        return res.status(400).json({ error: "invalid token" });
    }
    else if (error.name === "TokenExpiredError") {
        return res.status(401).json({ error: "token expired" });
    }
    else {
        if ((0, http_errors_1.isHttpError)(error)) {
            return res.status(error.status).json({ error: error.message });
        }
    }
};
exports.default = errorHandler;
//# sourceMappingURL=errorHandler.js.map