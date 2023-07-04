import Comment from "../models/comment";
import Tweet from "../models/tweet";

/**
 * @desc making a comment
 * @route POST /tweets/postId/retweet
 * @access Private
 */

const makeComment = async (req, res) => {
  const id = req.params.id;
  const tweet = await Tweet.findById(id);
  const { comment } = req.body;

  if (!comment) return res.status(400).json({ message: "Comment is required" });

  if (tweet === null)
    return res.status(404).json({ message: "Tweet not found" });
  const NewComment = new Comment({
    madeBy: req.user.id,
    comment: comment,
  });
  await NewComment.save();

  tweet.comments = tweet.comments.concat(NewComment._id);
  await tweet.save();

  res.status(200).json({ message: "Comment made" });
};

export { makeComment };
