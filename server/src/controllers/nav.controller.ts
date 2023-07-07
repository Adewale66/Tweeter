import { ReturnTweetProps, TweetProps, UserProps } from "../utils/types";
import User from "../models/users";
import Tweet from "../models/tweet";
import { sortTweets } from "../utils/homeTweets";

/**
 * @desc get home tweets
 * @route GET /home
 * @access Private
 */
const getHomeTweets = async (req, res) => {
  const user = await User.findById(req.user.id);
  const users: UserProps[] = await User.find({
    _id: { $in: [...user.following, user._id] },
  })
    .populate({
      path: "tweets.tweet",
      populate: {
        path: "madeBy",
        model: "User",
        select: "username profileimage",
      },
    })
    .populate({
      path: "tweets.tweet",
      populate: {
        path: "comments",
        populate: {
          path: "madeBy",
          model: "User",
          select: "username profileimage",
        },
      },
    });

  const tweets: ReturnTweetProps[] = sortTweets(users, req);
  return res.status(200).json(tweets);
};

/**
 * @desc get explore tweets
 * @route GET /explore
 * @access Public
 */

const getExploreTweets = async (req, res) => {
  const tweets: TweetProps[] = await Tweet.find({})
    .populate({
      path: "madeBy",
      model: "User",
      select: "username profileimage",
    })
    .populate({
      path: "comments",
      populate: {
        path: "madeBy",
        model: "User",
        select: "username profileimage",
      },
    });

  return res.status(200).json(tweets);
};

/**
 * @desc get saved tweets
 * @route GET /bookmarks
 * @access Private
 */

const getSavedTweets = async (req, res) => {
  const user: UserProps = await User.findById(req.user.id)
    .populate({
      path: "tweets.tweet",
      populate: {
        path: "madeBy",
        model: "User",
        select: "username profileimage",
      },
    })
    .populate({
      path: "tweets.tweet",
      populate: {
        path: "comments",
        populate: {
          path: "madeBy",
          model: "User",
          select: "username profileimage",
        },
      },
    });

  const tweets = user.tweets.filter((t) => t.saved);

  return res.status(200).json(tweets);
};

export { getHomeTweets, getExploreTweets, getSavedTweets };
