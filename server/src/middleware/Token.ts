import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const getAccessToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.status(401).json({ message: "Unauthorized" });
  jwt.verify(token, process.env.TOKEN_SECRET as string, (err, user) => {
    if (err) next(err);
    req.user = user;
    next();
  });
};

export const getRefreshToken = (req, res, next) => {
  const token = req.cookies.refresh_token;

  if (!token) return res.status(401).json({ message: "Unauthorized" });
  jwt.verify(token, process.env.REFRESH_TOKEN_SECRET as string, (err, user) => {
    if (err) next(err);
    req.user = user;
    next();
  });
};

export const generateRefreshToken = (payload) => {
  const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "10 days",
  });
  return refreshToken;
};

export const generateAccessToken = (payload) => {
  const accessToken = jwt.sign(payload, process.env.TOKEN_SECRET, {
    expiresIn: "1h",
  });
  return accessToken;
};

export const verifyToken = (token: string, type: "access" | "refresh") => {
  let valid: Boolean;
  if (type === "access")
    jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
      if (err) valid = false;
      else valid = true;
    });
  else
    jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
      if (err) valid = false;
      else valid = true;
    });

  return valid;
};
export default getAccessToken;
