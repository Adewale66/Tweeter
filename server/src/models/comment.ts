import { Schema, InferSchemaType, model } from "mongoose";

const commentSchema = new Schema(
  {
    comment: {
      type: String,
      required: true,
    },
    madeBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

type Comment = InferSchemaType<typeof commentSchema>;
export default model<Comment>("Comment", commentSchema);
