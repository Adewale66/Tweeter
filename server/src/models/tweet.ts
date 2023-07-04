import { Schema, InferSchemaType, model } from "mongoose";

const tweetSchema = new Schema(
  {
    tweet: {
      type: String,
      required: true,
    },
    likes: {
      type: Number,
      default: 0,
    },
    retweets: {
      type: Number,
      default: 0,
    },
    saves: {
      type: Number,
      default: 0,
    },
    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
    madeBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    image: String,
    preference: String,
  },
  { timestamps: true }
);

type Tweet = InferSchemaType<typeof tweetSchema>;
export default model<Tweet>("Tweet", tweetSchema);
