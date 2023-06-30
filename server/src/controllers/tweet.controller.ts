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
  const tweets = await Tweet.find().populate(["madeBy", "comments"]);
  return res.status(200).json(tweets);
};

/**
 * @desc interacting  to a tweet
 * @route PATCH /tweets/postId/interact
 * @access Private
 */

const interactTweet = async (req, res) => {
  const id = req.params.postId;
  const tweet = await Tweet.findById(id);
  const user = await User.findById(req.user.id);
  const { type } = req.body;

  if (!type) return res.status(400).json({ message: "Type is required" });

  if (type !== "liked" && type !== "retweeted" && type !== "saved")
    return res.status(400).json({ message: "Type is invalid" });

  const tweetType =
    type === "liked" ? "likes" : type === "retweeted" ? "retweets" : "saves";

  if (tweet === null)
    return res.status(404).json({ message: "Tweet not found" });

  const idx = user.tweets.findIndex(
    (t) => t.tweet._id.toString() == tweet._id.toString()
  );

  if (idx !== -1) {
    if (user.tweets[idx][type]) {
      tweet[tweetType]--;
      await tweet.save();
      user.tweets[idx][type] = false;
      if (
        !user.tweets[idx]["liked"] &&
        !user.tweets[idx]["retweeted"] &&
        !user.tweets[idx]["saved"] &&
        tweet.madeBy.toString() !== user._id.toString()
      )
        user.tweets = user.tweets.filter(
          (t) => t.tweet._id.toString() !== tweet._id.toString()
        );
      await user.save();
      return res.status(200).json({ message: "success" });
    }

    tweet[tweetType]++;
    await tweet.save();
    user.tweets[idx][type] = true;
    if (type === "retweeted") user.tweets[idx]["timeMade"] = new Date();
    await user.save();
    return res.status(200).json({ message: "success" });
  }

  tweet[tweetType]++;
  await tweet.save();

  user.tweets = user.tweets.concat({
    tweet: tweet._id,
    liked: type === "liked",
    retweeted: type === "retweeted",
    saved: type === "saved",
    timeMade: type === "retweeted" && new Date(),
  });
  await user.save();

  return res.status(200).json({ message: "success" });
};

export { createTweet, getTweet, getAllTweets, interactTweet };
