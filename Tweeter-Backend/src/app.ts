import express from "express";
import cors from "cors";
import compression from "compression";
import cookieParser from "cookie-parser";
import userRouter from "./routes/user.route";
import { logRouter } from "./routes/log.route";
import { errorHandler, unknownEndpoint } from "./utils/middleware";
import morgan from "morgan";
import tweetRouter from "./routes/tweet.route";

const app = express();

app.use(
  cors({
    credentials: true,
  })
);

app.use(compression());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));

app.use("/api", logRouter);
app.use("/api/user", userRouter);
app.use("/api/tweet", tweetRouter);

app.use(unknownEndpoint);
app.use(errorHandler);

export default app;
