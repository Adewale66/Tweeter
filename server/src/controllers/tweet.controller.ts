import Tweet from "../models/tweet";
import User from "../models/users";

/**
 * @desc Create Tweet by user
 * @route POST /tweets
 * @access Private
 */

const createTweet = async (req, res) => {
  const { tweet, preference } = req.body;
  let imageUrl = "";
  if (req.file) {
    const file = req.file;
    imageUrl = `${req.protocol}://${req.get("host")}/uploads/${file.filename}`;
  }

  if (!tweet || !preference)
    return res.status(400).json({ message: "Tweet is required" });

  const newTweet = new Tweet({
    tweet,
    preference,
    image: imageUrl,
    madeBy: req.user.id,
  });
  const saved = await newTweet.save();
  const user = await User.findById(req.user.id);
  user.tweets = user.tweets.concat({
    tweet: saved._id,
    liked: false,
    retweeted: false,
    saved: false,
    timeMade: saved.createdAt,
  });
  await user.save();
  res.status(201).json({ message: "success" });
};

/**
 * @desc specific tweet
 * @route GET /tweets
 * @access Public
 */

const getTweet = async (req, res) => {
  const id = req.params.id;

  const tweet = await Tweet.findById(id)
    .populate({
      path: "comments",
      populate: {
        path: "madeBy",
        model: "User",
        select: "username profileimage",
      },
    })
    .populate({
      path: "madeBy",
      model: "User",
      select: "username profileimage",
    });
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
  const tweets = await Tweet.find().populate(["madeBy", "comments"]);
  return res.status(200).json(tweets);
};

/**
 * @desc liking a tweet
 * @route POST /tweets/postId/like
 * @access Private
 */

const likeTweet = async (req, res) => {
  const id = req.params.postId;
  const tweet = await Tweet.findById(id);
  const user = await User.findById(req.user.id);
  const idx = user.tweets.findIndex(
    (t) => t.tweet._id.toString() == tweet._id.toString()
  );

  if (idx !== -1) {
    if (user.tweets[idx].liked)
      return res.status(400).json({ message: " Tweet already Liked" });
    user.tweets[idx].liked = true;
    await user.save();
    tweet.likes++;
    await tweet.save();

    return res.status(200).json({ message: "Tweet Liked" });
  }
  user.tweets = user.tweets.concat({
    tweet: tweet._id,
    liked: true,
    retweeted: false,
    saved: false,
    timeMade: new Date(),
  });
  await user.save();
  tweet.likes++;
  await tweet.save();

  return res.status(200).json({ message: "Tweet Liked" });
};

/**
 * @desc removing a like from  a tweet
 * @route POST /tweets/postId/removeLike
 * @access Private
 */

const removeLike = async (req, res) => {
  const id = req.params.postId;
  const tweet = await Tweet.findById(id);
  const user = await User.findById(req.user.id);

  const idx = user.tweets.findIndex(
    (t) => t.tweet._id.toString() == tweet._id.toString()
  );

  if (idx === -1) return res.status(400).json({ message: "Tweet not found" });
  if (!user.tweets[idx].liked)
    return res.status(400).json({ message: "like already removed" });

  tweet.likes--;
  if (tweet.likes < 0) tweet.likes = 0;
  await tweet.save();

  user.tweets[idx].liked = false;
  if (
    !user.tweets[idx].saved &&
    !user.tweets[idx].retweeted &&
    !user.tweets[idx].liked &&
    tweet.madeBy.toString() !== user._id.toString()
  )
    user.tweets = user.tweets.filter(
      (t) => t.tweet._id.toString() !== tweet._id.toString()
    );
  await user.save();
  return res.status(200).json({ message: "Liked Removed" });
};

/**
 * @desc retweeting  a tweet
 * @route POST /tweets/postId/createRetweet
 * @access Private
 */

const createRetweet = async (req, res) => {
  const id = req.params.postId;
  const tweet = await Tweet.findById(id);
  const user = await User.findById(req.user.id);
  const idx = user.tweets.findIndex(
    (t) => t.tweet._id.toString() == tweet._id.toString()
  );

  if (idx !== -1) {
    if (user.tweets[idx].retweeted)
      return res.status(400).json({ message: " Tweet already retweeted" });
    user.tweets[idx].retweeted = true;
    user.tweets[idx].timeMade = new Date();
    await user.save();
    tweet.retweets++;
    await tweet.save();
    return res.status(200).json({ message: "Tweet retweeted" });
  }
  user.tweets = user.tweets.concat({
    tweet: tweet._id,
    liked: false,
    retweeted: true,
    saved: false,
    timeMade: new Date(),
  });
  await user.save();
  tweet.retweets++;
  await tweet.save();

  return res.status(200).json({ message: "Tweet retweeted" });
};

/**
 * @desc deleting a retweet from a tweet
 * @route POST /tweets/postId/deleteRetweet
 * @access Private
 */

const deleteRetweet = async (req, res) => {
  const id = req.params.postId;
  const tweet = await Tweet.findById(id);
  const user = await User.findById(req.user.id);

  const idx = user.tweets.findIndex(
    (t) => t.tweet._id.toString() == tweet._id.toString()
  );

  if (idx === -1) return res.status(400).json({ message: "Tweet not found" });
  if (!user.tweets[idx].retweeted)
    return res.status(400).json({ message: "retweet already removed" });

  tweet.retweets--;
  if (tweet.retweets < 0) tweet.retweets = 0;
  await tweet.save();

  user.tweets[idx].retweeted = false;
  if (
    !user.tweets[idx].saved &&
    !user.tweets[idx].retweeted &&
    !user.tweets[idx].liked &&
    tweet.madeBy.toString() !== user._id.toString()
  )
    user.tweets = user.tweets.filter(
      (t) => t.tweet._id.toString() !== tweet._id.toString()
    );
  await user.save();
  return res.status(200).json({ message: "retweet Removed" });
};

/**
 * @desc  Bookmark a tweet
 * @route POST /tweets/postId/bookmark
 * @access Private
 */

const bookmarkTweet = async (req, res) => {
  const id = req.params.postId;
  const tweet = await Tweet.findById(id);
  const user = await User.findById(req.user.id);
  const idx = user.tweets.findIndex(
    (t) => t.tweet._id.toString() == tweet._id.toString()
  );

  if (idx !== -1) {
    if (user.tweets[idx].saved)
      return res.status(400).json({ message: " Tweet already Bookmarked" });
    user.tweets[idx].saved = true;
    tweet.saves++;
    await user.save();
    await tweet.save();
    return res.status(200).json({ message: "Tweet Bookmarked" });
  }
  user.tweets = user.tweets.concat({
    tweet: tweet._id,
    liked: false,
    retweeted: false,
    saved: true,
    timeMade: new Date(),
  });
  await user.save();
  tweet.saves++;
  await tweet.save();

  return res.status(200).json({ message: "Tweet Bookmarked" });
};

/**
 * @desc  Deleting a bookmark from a tweet
 * @route POST /tweets/postId/removeBookmark
 * @access Private
 */

const removeBookmark = async (req, res) => {
  const id = req.params.postId;
  const tweet = await Tweet.findById(id);
  const user = await User.findById(req.user.id);

  const idx = user.tweets.findIndex(
    (t) => t.tweet._id.toString() == tweet._id.toString()
  );

  if (idx === -1) return res.status(400).json({ message: "Tweet not found" });
  if (!user.tweets[idx].saved)
    return res.status(400).json({ message: "bookmark already removed" });

  tweet.saves--;
  if (tweet.saves < 0) tweet.saves = 0;
  await tweet.save();

  user.tweets[idx].saved = false;
  if (
    !user.tweets[idx].saved &&
    !user.tweets[idx].retweeted &&
    !user.tweets[idx].liked &&
    tweet.madeBy.toString() !== user._id.toString()
  )
    user.tweets = user.tweets.filter(
      (t) => t.tweet._id.toString() !== tweet._id.toString()
    );
  await user.save();
  return res.status(200).json({ message: "Bookmark Removed" });
};

export {
  createTweet,
  getTweet,
  getAllTweets,
  likeTweet,
  removeLike,
  createRetweet,
  deleteRetweet,
  bookmarkTweet,
  removeBookmark,
};
