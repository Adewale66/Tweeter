import mongoose from "mongoose";
import app from "./app";
import { MONGODB_URI, port } from "./utils/config";
import { info, errorInfo } from "./utils/logger";

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    info("db connected");
  })
  .catch((error) => {
    errorInfo(error);
  });

app.listen(port, () => {
  console.log(`server on port http://localhost/${port}/api`);
});
