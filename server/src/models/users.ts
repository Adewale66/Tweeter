import { InferSchemaType, model, Schema } from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

const userSchema = new Schema({
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

  description: {
    type: String,
    default: "",
  },
  profileimage: {
    type: String,
    default: "",
  },
  bannerImage: {
    type: String,
    default: "",
  },
  images: [{ url: String, timeMade: Date }],
  tweets: [
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

userSchema.plugin(uniqueValidator);

userSchema.set("toJSON", {
  transform: (document, r) => {
    r.id = r._id;
    delete r._id;
    delete r.__v;
    delete r.hashedPassword;
  },
});

type User = InferSchemaType<typeof userSchema>;

export default model<User>("User", userSchema);
