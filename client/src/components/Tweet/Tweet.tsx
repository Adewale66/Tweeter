import {
  Avatar,
  Container,
  Group,
  Text,
  Image,
  Flex,
  Divider,
  createStyles,
} from "@mantine/core";

import Interact from "./Interact";
import Reply from "./Reply";
import Comments from "./Comments";
import { Link } from "react-router-dom";
import { IconRefresh } from "@tabler/icons-react";
import { TweetProps } from "../../types/user";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { useState } from "react";

const useStyles = createStyles((theme) => ({
  container: {
    padding: "0",
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
    marginBottom: "3rem",
  },
  retweeted: {
    position: "relative",
    backgroundColor: theme.colorScheme === "light" ? "#e0e0e0" : "#1A1B1E",
    color: theme.colorScheme === "dark" ? theme.white : theme.colors.gray[6],
  },
  body: {
    padding: "1rem",
    display: "flex",
    flexDirection: "column",
    gap: "0.8rem",
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[6]
        : theme.colors.gray[0],
    borderRadius: "0.5rem",
  },
}));
const Tweet = ({ tweet }: { tweet: TweetProps }) => {
  const date = new Date(tweet.tweet.createdAt);
  const options: Intl.DateTimeFormatOptions = {
    month: "long",
    day: "numeric",
    hour12: false,
    hour: "numeric",
    minute: "numeric",
    timeZone: "UTC",
  };
  const formatter = new Intl.DateTimeFormat("en-US", options);
  const formattedDate = formatter.format(date);

  const { classes, theme } = useStyles();
  const user = useSelector((state: RootState) => state.auth.userInfo);
  const [displayReply, setDisplayReply] = useState(false);
  return (
    <Container className={classes.container} size="xs">
      {tweet.retweeted && (
        <Flex gap={5} align="center" className={classes.retweeted}>
          <IconRefresh width={20} height={20} strokeWidth={1.5} />
          <Text fw={500} fz={14}>
            {tweet.retweetedBy &&
              tweet.retweetedBy === user?.username &&
              "You Retweeted"}
            {tweet.retweetedBy &&
              tweet.retweetedBy !== user?.username &&
              `${tweet.retweetedBy} Retweeted`}
            {!tweet.retweetedBy && "You Retweeted"}
          </Text>
        </Flex>
      )}
      <div className={classes.body}>
        <Group>
          <Avatar
            src={tweet.tweet.madeBy.profileimage}
            alt="wale"
            radius="md"
          />
          <div>
            <Text fz="sm" component={Link} to="/admin">
              {tweet.tweet.madeBy.username}
            </Text>
            <Text fz="xs" c="dimmed">
              {formattedDate}
            </Text>
          </div>
        </Group>
        <Text>{tweet.tweet.tweet}</Text>
        {tweet.tweet.image && (
          <Image
            mx="auto"
            radius="md"
            alt="random"
            src={tweet.tweet.image}
            withPlaceholder
          />
        )}
        <Flex gap={8}>
          <Text fz="xs" ml="auto" color="grey">
            {tweet.tweet.comments.length} comments
          </Text>
          <Text fz="xs" color="grey">
            {" "}
            {tweet.tweet.retweets} Retweets
          </Text>
          <Text fz="xs" color="grey">
            {tweet.tweet.saves} Saved
          </Text>
        </Flex>
        <Divider color={theme.colorScheme === "dark" ? "gray.7" : "gray.3"} />
        <Interact
          id={tweet.tweet._id}
          saved={tweet.saved}
          retweeted={tweet.retweeted}
          liked={tweet.liked}
          setDisplayReply={setDisplayReply}
        />
        <Divider color={theme.colorScheme === "dark" ? "gray.7" : "gray.3"} />
        <Reply showCommentBar={displayReply} id={tweet.tweet._id} />
        {tweet.tweet.comments.length > 0 &&
          tweet.tweet.comments.map((c) => (
            <Comments key={c.createdAt} comment={c} />
          ))}
      </div>
    </Container>
  );
};

export default Tweet;
