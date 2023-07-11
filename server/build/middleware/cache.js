"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const setCache = (req, res, next) => {
    const period = 60 * 60 * 24;
    if (req.method === "GET")
        res.set("Cache-Control", `public, max-age=${period}`);
    else
        res.set("Cache-Control", `no-store`);
    next();
};
exports.default = setCache;
//# sourceMappingURL=cache.js.map