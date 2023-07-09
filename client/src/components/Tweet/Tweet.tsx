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
import { Link, useParams } from "react-router-dom";
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
const Tweet = ({
  tweet,
  ids,
}: {
  tweet: TweetProps;
  ids: { id: string; retweeted: boolean; liked: boolean; saved: boolean }[];
}) => {
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
  const { profile } = useParams();
  const tweetIds = ids?.map((t) => t.id);
  const idx = tweetIds?.indexOf(tweet.tweet._id);

  return (
    <Container className={classes.container} size="xs">
      {tweet.retweeted && profile && profile === user?.username && (
        <Flex gap={5} align="center" className={classes.retweeted}>
          <IconRefresh width={20} height={20} strokeWidth={1.5} />
          <Text fw={500} fz={14}>
            You Retweeted
          </Text>
        </Flex>
      )}
      {tweet.retweeted && profile && profile !== user?.username && (
        <Flex gap={5} align="center" className={classes.retweeted}>
          <IconRefresh width={20} height={20} strokeWidth={1.5} />
          <Text fw={500} fz={14}>
            {profile} Retweeted
          </Text>
        </Flex>
      )}
      {tweet.retweeted && !profile && tweet.retweetedBy && (
        <Flex gap={5} align="center" className={classes.retweeted}>
          <IconRefresh width={20} height={20} strokeWidth={1.5} />
          <Text fw={500} fz={14}>
            {tweet.retweetedBy === user?.username ? "You" : tweet.retweetedBy}{" "}
            Retweeted
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
            <Text
              fz="sm"
              component={Link}
              to={`/${tweet.tweet.madeBy.username}`}
            >
              {tweet.tweet.madeBy.name}
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
        {profile &&
          profile !== user?.username &&
          tweetIds?.includes(tweet.tweet._id) && (
            <Interact
              id={ids[idx].id}
              saved={ids[idx].saved}
              retweeted={ids[idx].retweeted}
              liked={ids[idx].liked}
              setDisplayReply={setDisplayReply}
            />
          )}
        {profile &&
          profile !== user?.username &&
          !tweetIds?.includes(tweet.tweet._id) && (
            <Interact
              id={tweet.tweet._id}
              saved={false}
              retweeted={false}
              liked={false}
              setDisplayReply={setDisplayReply}
            />
          )}

        {profile === user?.username && (
          <Interact
            id={tweet.tweet._id}
            saved={tweet.saved}
            retweeted={tweet.retweeted}
            liked={tweet.liked}
            setDisplayReply={setDisplayReply}
          />
        )}
        {!profile && tweetIds?.includes(tweet.tweet._id) && (
          <Interact
            id={tweet.tweet._id}
            saved={ids[idx].saved}
            retweeted={ids[idx].retweeted}
            liked={ids[idx].liked}
            setDisplayReply={setDisplayReply}
          />
        )}
        {!profile && !tweetIds?.includes(tweet.tweet._id) && (
          <Interact
            id={tweet.tweet._id}
            saved={false}
            retweeted={false}
            liked={false}
            setDisplayReply={setDisplayReply}
          />
        )}

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
