import { ErrorRequestHandler } from "express";
import { isHttpError } from "http-errors";

const errorHandler: ErrorRequestHandler = (error, req, res, next) => {
  if (error.name === "CastError") {
    return res.status(400).send({ error: "malformatted id" });
  } else if (error.name === "ValidationError") {
    return res.status(400).json({ error: error.name });
  } else if (error.name === "JsonWebTokenError") {
    return res.status(400).json({ error: "invalid token" });
  } else if (error.name === "TokenExpiredError") {
    return res.status(401).json({ error: "token expired" });
  } else {
    if (isHttpError(error)) {
      return res.status(error.status).json({ error: error.message });
    }
  }
};

export default errorHandler;
