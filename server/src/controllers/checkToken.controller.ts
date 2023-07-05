/**
 * @desc checking if token is still valid
 * @route GET /checkToken
 * @access Private
 */

import { generateAccessToken, verifyToken } from "../middleware/Token";

const checkToken = async (req, res) => {
  const refresh_token = req.cookies.refresh_token;
  if (!refresh_token) return res.status(401).json({ message: "unauthorized" });

  const authHeader = req.headers["authorization"];

  const token = authHeader && authHeader.split(" ")[1];

  const verifyHeaderToken = verifyToken(token, "access");

  if (!verifyHeaderToken) {
    const { username, id } = req.body;

    if (!username && !id)
      return res.status(401).json({ message: "unauthorized" });

    const verifyCookieToken = verifyToken(refresh_token, "refresh");

    if (!verifyCookieToken)
      return res.status(401).json({ message: "unauthorized" });

    const newtoken = generateAccessToken({ username, id });
    return res.status(200).json({ message: newtoken });
  } else return res.status(200).json({ message: token });
};

export { checkToken };
