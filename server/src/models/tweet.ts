import mongoose from "mongoose";
const { Schema } = mongoose;

const tweetSchema = new Schema(
  {
    tweet: String,
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
    },

    image: String,
    preference: String,
  },
  { timestamps: true }
);

tweetSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

export default mongoose.model("Tweet", tweetSchema);
