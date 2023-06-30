import dotenv from "dotenv";

dotenv.config();
import path from "path";
import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const destinationPath = path.join(
      __dirname,
      "..",
      "..",
      "public",
      "uploads"
    );
    cb(null, destinationPath);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage });

const port = process.env.PORT || 8000;

const NodeEnv = process.env.NODE_ENV;

const MONGODB_URI =
  NodeEnv === "test" ? process.env.TEST_MONGODB_URI : process.env.MONGODB_URI;

export { MONGODB_URI, port, upload, NodeEnv };
