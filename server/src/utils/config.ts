import dotenv from "dotenv";

dotenv.config();

const port = process.env.PORT || 8000;

const MONGODB_URI =
  process.env.NODE_ENV === "test"
    ? process.env.TEST_MONGODB_URI
    : process.env.MONGODB_URI;

export { MONGODB_URI, port };
