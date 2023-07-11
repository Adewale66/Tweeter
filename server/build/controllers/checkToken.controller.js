"use strict";
/**
 * @desc checking if token is still valid
 * @route GET /checkToken
 * @access Private
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkToken = void 0;
const Token_1 = require("../middleware/Token");
const checkToken = async (req, res) => {
    const refresh_token = req.cookies.refresh_token;
    if (!refresh_token)
        return res.status(401).json({ message: "unauthorized" });
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    const verifyHeaderToken = (0, Token_1.verifyToken)(token, "access");
    if (!verifyHeaderToken) {
        const { username, id } = req.body;
        if (!username && !id)
            return res.status(401).json({ message: "unauthorized" });
        const verifyCookieToken = (0, Token_1.verifyToken)(refresh_token, "refresh");
        if (!verifyCookieToken)
            return res.status(401).json({ message: "unauthorized" });
        const newtoken = (0, Token_1.generateAccessToken)({ username, id });
        return res.status(200).json({ message: newtoken });
    }
    else
        return res.status(200).json({ message: token });
};
exports.checkToken = checkToken;
//# sourceMappingURL=checkToken.controller.js.map