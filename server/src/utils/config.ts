import dotenv from "dotenv";
import path from "path";
import multer from "multer";

dotenv.config();

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
const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});

const port = process.env.PORT || 8000;

const URL = process.env.HOST_URL;

const NodeEnv = process.env.NODE_ENV;
const superuserId = process.env.SUPERUSER_ID;

const MONGODB_URI = process.env.MONGODB_URI;

export { MONGODB_URI, port, upload, NodeEnv, superuserId, URL };
