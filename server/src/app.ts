import express from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import cookieParser from "cookie-parser";
import userRouter from "./routes/user.route";
import { logRouter } from "./routes/log.route";
import { errorHandler, unknownEndpoint } from "./middleware/middleware";
import morgan from "morgan";
import tweetRouter from "./routes/tweet.route";
import tokenRouter from "./routes/checkToken.route";
import navRouter from "./routes/nav.route";
import { NodeEnv } from "./utils/config";

const app = express();

app.use(
  cors({
    credentials: true,
  })
);

app.use(
  helmet({
    crossOriginResourcePolicy: {
      policy: "cross-origin",
    },
  })
);

app.use(compression());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
if (NodeEnv !== "test") app.use(morgan("dev"));
app.use(express.static("public"));

app.use("/api", logRouter);
app.use("/api", tokenRouter);
app.use("/api/user", userRouter);
app.use("/api/tweet", tweetRouter);
app.use("/api", navRouter);

app.use(unknownEndpoint);
app.use(errorHandler);

export default app;
