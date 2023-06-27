import User from "../models/users";
import Comment from "../models/comment";
import Tweet from "../models/tweet";

interface UserProps {
  username: string;
  tweets: TweetProps[];
  interactedTweets: {
    tweet: TweetProps;
    liked: boolean;
    saved: boolean;
    retweeted: boolean;
    timeMade: string;
  }[];
}

interface TweetProps {
  tweet: string;
  retweets: number;
  saved: number;
  comments: {
    comment: string;
    madeBy: {
      username: string;
    };
  }[];
  madeBy: {
    username: string;
  };
  preference: string;
  createdAt: string;
  image?: string;
}

const getHomeTweets = async (req, res) => {
  const user = await User.findById(req.user.id);
  const tweets: UserProps[] = await User.find({
    _id: { $in: [...user.following, user._id] },
  })
    .populate({
      path: "interactedTweets.tweet",
      populate: {
        path: "madeBy",
        model: "User",
      },
    })
    .populate({
      path: "tweets",
      populate: {
        path: "comments",
        populate: {
          path: "madeBy",
          model: "User",
        },
      },
    });
  console.log("tweet", tweets);

  console.log(tweets[1].tweets[0]);
  console.log(tweets[1].interactedTweets[0].timeMade);

  return res.status(200).json(tweets);
};

export { getHomeTweets };
