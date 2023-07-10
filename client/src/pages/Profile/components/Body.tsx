import { Box, Flex, Stack, Text, createStyles } from "@mantine/core";
import Tweet from "../../../components/Tweet/Tweet";
import { TweetProps } from "../../../types/user";
import { useState, useMemo } from "react";

const useStyles = createStyles((theme) => ({
  container: {
    margin: "0 auto",
    color: theme.colorScheme === "dark" ? theme.white : theme.black,

    width: "60%",
    [theme.fn.smallerThan("md")]: {
      width: "90%",
    },
  },
  stack: {
    borderRadius: "0.5rem",
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[6]
        : theme.colors.gray[0],
    [theme.fn.smallerThan("md")]: {
      flexGrow: 1,
      marginBottom: "2rem",
    },
  },
  text: {
    ...theme.fn.hover({
      cursor: "pointer",
    }),
  },
  tweet: {
    [theme.fn.smallerThan("md")]: {
      // width: "100%",
      flexGrow: 1,
    },
  },
}));

const Body = ({
  tweets,
  ids,
}: {
  tweets: TweetProps[];
  ids: { id: string; retweeted: boolean; liked: boolean; saved: boolean }[];
}) => {
  const temp = [...tweets];
  temp.sort((a, b) => {
    const time1 = new Date(a.tweet.createdAt);
    const time2 = new Date(b.tweet.createdAt);
    return time2.getTime() - time1.getTime();
  });
  const { classes } = useStyles();
  const [tweetsDisplay, setTweetsDisplay] = useState(true);
  const [tweetsReplyDisplay, setTweetsReplyDisplay] = useState(false);
  const [mediaDisplay, setMediaDisplay] = useState(false);
  const [tweetsLikedDisplay, setTweetsLikedDisplay] = useState(false);

  const homeTweets = useMemo(
    () =>
      tweets.map((t) => {
        const temp = JSON.parse(JSON.stringify(t));
        temp.tweet.comments = [];
        return temp;
      }),
    [tweets]
  );

  const tweetsWithReplies = useMemo(
    () => tweets.filter((t) => t.tweet.comments.length > 0),
    [tweets]
  );

  const tweetWithImages = useMemo(
    () => tweets.filter((t) => t.tweet.image),
    [tweets]
  );
  const likedTweets = useMemo(() => tweets.filter((t) => t.liked), [tweets]);

  return (
    <Box className={classes.container}>
      <Flex gap={60} wrap="wrap">
        <Stack w={250} h="fit-content" p={12} className={classes.stack}>
          <Text
            fz={14}
            fw={600}
            className={classes.text}
            onClick={() => {
              setMediaDisplay(false);
              setTweetsDisplay(true);
              setTweetsLikedDisplay(false);
              setTweetsReplyDisplay(false);
            }}
          >
            Tweets
          </Text>
          <Text
            fz={14}
            fw={600}
            className={classes.text}
            onClick={() => {
              setMediaDisplay(false);
              setTweetsDisplay(false);
              setTweetsLikedDisplay(false);
              setTweetsReplyDisplay(true);
            }}
          >
            Tweets & replies
          </Text>
          <Text
            fz={14}
            fw={600}
            className={classes.text}
            onClick={() => {
              setMediaDisplay(true);
              setTweetsDisplay(false);
              setTweetsLikedDisplay(false);
              setTweetsReplyDisplay(false);
            }}
          >
            Media
          </Text>
          <Text
            fz={14}
            fw={600}
            className={classes.text}
            onClick={() => {
              setMediaDisplay(false);
              setTweetsDisplay(false);
              setTweetsLikedDisplay(true);
              setTweetsReplyDisplay(false);
            }}
          >
            Likes
          </Text>
        </Stack>
        <div className={classes.tweet}>
          {tweetsDisplay &&
            homeTweets.map((tweet) => (
              <Tweet key={tweet.tweet._id} tweet={tweet} ids={ids} />
            ))}

          {tweetsReplyDisplay &&
            tweetsWithReplies.map((tweet) => (
              <Tweet key={tweet.tweet._id} tweet={tweet} ids={ids} />
            ))}

          {mediaDisplay &&
            tweetWithImages.map((tweet) => (
              <Tweet key={tweet.tweet._id} tweet={tweet} ids={ids} />
            ))}
          {tweetsLikedDisplay &&
            likedTweets.map((tweet) => (
              <Tweet key={tweet.tweet._id} tweet={tweet} ids={ids} />
            ))}
        </div>
      </Flex>
    </Box>
  );
};

export default Body;
