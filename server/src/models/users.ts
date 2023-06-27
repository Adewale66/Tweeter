import mongoose from "mongoose";
import uniqueValidator from "mongoose-unique-validator";
const { Schema } = mongoose;

const User = new Schema({
  name: String,
  username: {
    unique: true,
    required: true,
    type: String,
    uniqueCaseInsensitive: true,
  },
  hashedPassword: String,
  following: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],

  followers: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],

  description: String,
  Profileimage: {
    type: String,
  },
  bannerImage: {
    type: String,
  },
  images: [{ url: String, timeMade: Date }],
  tweets: [
    {
      type: Schema.Types.ObjectId,
      ref: "Tweet",
    },
  ],
  interactedTweets: [
    {
      tweet: {
        type: Schema.Types.ObjectId,
        ref: "Tweet",
      },
      liked: Boolean,
      saved: Boolean,
      retweeted: Boolean,
      timeMade: Date,
    },
  ],
});

User.plugin(uniqueValidator);

User.set("toJSON", {
  transform: (document, r) => {
    r.id = r._id;
    delete r._id;
    delete r.__v;
    delete r.hashedPassword;
  },
});

export default mongoose.model("User", User);
