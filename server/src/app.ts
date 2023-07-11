import express from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import cookieParser from "cookie-parser";
import userRouter from "./routes/user.route";
import { logRouter } from "./routes/log.route";
import errorHandler from "./middleware/errorHandler";
import morgan from "morgan";
import tweetRouter from "./routes/tweet.route";
import tokenRouter from "./routes/checkToken.route";
import navRouter from "./routes/nav.route";
import { NodeEnv, URL } from "./utils/config";
import createHttpError from "http-errors";
import path from "path";

console.log(NodeEnv);

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
    contentSecurityPolicy: {
      useDefaults: true,
      ...helmet.contentSecurityPolicy.getDefaultDirectives(),
      directives: {
        "img-src": [
          "'self'",
          "blob:",
          "data:",
          "http://localhost:8000",
          `${URL}`,
        ],
      },
    },
  })
);

app.use(compression());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
if (NodeEnv === "production") {
  app.set("trust proxy", true);
  app.use(morgan("combined"));
} else {
  app.use(morgan("dev"));
}
app.use(express.static("public"));
app.use("/api", logRouter);
app.use("/api", tokenRouter);
app.use("/api/user", userRouter);
app.use("/api/tweet", tweetRouter);
app.use("/api", navRouter);

if (NodeEnv === "production") {
  const __dirname = path.resolve();

  app.use(express.static(path.join(__dirname, "../client/dist")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "../client", "dist", "index.html"))
  );
} else app.get("/", (req, res) => res.send("Server is running!"));

app.use((req, res, next) => next(createHttpError(404, "Endpoint not found")));
app.use(errorHandler);

export default app;
