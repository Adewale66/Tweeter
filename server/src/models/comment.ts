import mongoose from "mongoose";
const { Schema } = mongoose;

const commentSchema = new Schema(
  {
    comment: String,
    madeBy: { type: Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

commentSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

export default mongoose.model("Comment", commentSchema);
