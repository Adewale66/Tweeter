import Tweet from "../models/tweet";
import User from "../models/users";

/**
 * @desc Create Tweet by user
 * @route POST /tweets
 * @access Private
 */

const createTweet = async (req, res) => {
  const { tweet } = req.body;
  if (!tweet) return res.status(400).json({ message: "Tweet is required" });

  const newTweet = new Tweet({
    tweet,
    likes: 0,
    retweets: 0,
    saved: 0,
    madeBy: req.user.id,
  });
  const saved = await newTweet.save();
  const user = await User.findById(req.user.id);
  user.tweets = [saved._id, ...user.tweets];
  await user.save();
  res.status(201).json(saved);
};

/**
 * @desc specific tweet
 * @route GET /tweets
 * @access Public
 */

const getTweet = async (req, res) => {
  const id = req.params.id;

  const tweet = await Tweet.findById(id).populate(["madeBy", "comments"]);
  if (tweet === null)
    return res.status(404).json({ message: "Tweet not found" });
  return res.status(200).json(tweet);
};

/**
 * @desc All tweets
 * @route GET /tweets
 * @access Public
 */

const getAllTweets = async (req, res) => {
  const tweets = await Tweet.find();
  return res.status(200).json(tweets);
};

/**
 * @desc liking to a tweet
 * @route PATCH /tweets/postId/like
 * @access Private
 */

const likeTweet = async (req, res) => {
  const id = req.params.postId;
  const tweet = await Tweet.findById(id);
  const user = await User.findById(req.user.id);

  if (tweet === null)
    return res.status(404).json({ message: "Tweet not found" });

  if (user.likes.map((id) => id.toString()).includes(tweet._id.toString())) {
    tweet.likes--;
    await tweet.save();
    user.likes = user.likes.filter(
      (like) => like.toString() !== tweet._id.toString()
    );

    await user.save();
  } else {
    tweet.likes++;
    await tweet.save();

    user.likes = [...user.likes, tweet._id];
    await user.save();
  }

  return res.status(200).json({ message: "Tweet Liked" });
};

/**
 * @desc Retweeting  a tweet
 * @route PATCH /tweets/postId/retweet
 * @access Private
 */

const retweetTweet = async (req, res) => {
  const id = req.params.postId;
  const tweet = await Tweet.findById(id);
  const user = await User.findById(req.user.id);

  if (user.retweets.map((id) => id.toString()).includes(tweet._id.toString())) {
    tweet.retweets--;
    await tweet.save();
    user.retweets = user.retweets.filter(
      (like) => like.toString() !== tweet._id.toString()
    );

    await user.save();
  } else {
    tweet.retweets++;
    await tweet.save();

    user.retweets = [...user.retweets, tweet._id];
    await user.save();
  }

  return res.status(200).json({ message: "Tweet Liked" });
};

/**
 * @desc saving a tweet
 * @route PATCH /tweets/postId/save
 * @access Private
 */

const saveTweet = async (req, res) => {
  const id = req.params.postId;
  const tweet = await Tweet.findById(id);
  const user = await User.findById(req.user.id);

  if (user.saved.map((id) => id.toString()).includes(tweet._id.toString())) {
    tweet.saved--;
    await tweet.save();
    user.saved = user.saved.filter(
      (like) => like.toString() !== tweet._id.toString()
    );

    await user.save();
  } else {
    tweet.saved++;
    await tweet.save();

    user.saved = [...user.saved, tweet._id];
    await user.save();
  }

  return res.status(200).json({ message: "Tweet Liked" });
};

export {
  createTweet,
  getTweet,
  getAllTweets,
  likeTweet,
  retweetTweet,
  saveTweet,
};
