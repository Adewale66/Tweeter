import mongoose from "mongoose";
import app from "./app";
import { MONGODB_URI, port } from "./utils/config";

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("db connected");
  })
  .catch((error) => {
    console.log(error);
  });

app.listen(port, () => {
  console.log(`server on port http://localhost/${port}/api`);
});
