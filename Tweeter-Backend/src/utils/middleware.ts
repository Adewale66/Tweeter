import { errorInfo, info } from "./logger";
import jwt from "jsonwebtoken";

const unknownEndpoint = (req, res, next) => {
  const error = new Error(`Not found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

const getAccessToken = (req, res, next) => {
  const token = req.cookies.access_token;

  if (!token) return res.status(401).json({ message: "Unauthorized" });
  jwt.verify(token, process.env.TOKEN_SECRET as string, (err, user) => {
    if (err) next(err);
    req.user = user;
    next();
  });
};

const errorHandler = (error, request, response, next) => {
  errorInfo("im here", error.name);

  if (error.name === "CastError") {
    return response.status(404).send({ error: "malformatted id" });
  } else if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message });
  } else if (error.name === "JsonWebTokenError") {
    return response.status(401).json({ error: "invalid token" });
  } else if (error.name === "TokenExpiredError") {
    return response.status(401).json({ error: "token expired" });
  }

  next(error);
};

export { unknownEndpoint, getAccessToken, errorHandler };
