import { Flex, Button, createStyles, Text } from "@mantine/core";
import {
  IconMessageCircle,
  IconRefresh,
  IconHeart,
  IconBookmark,
} from "@tabler/icons-react";
import {
  useLikeTweetMutation,
  useRemoveLikeMutation,
  useRemoveBookmarkMutation,
  useRemoveRetweetMutation,
  useSaveTweetMutation,
  useRetweetTweetMutation,
} from "../../slices/api/tweetApiSlice";
import toast from "react-hot-toast";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useCheckTokenMutation } from "../../slices/api/userApiSlice";
import { changeToken, removeCredentials } from "../../slices/authSlice";
import { AppDispatch, RootState } from "../../store";

const useStyles = createStyles((theme) => ({
  hiddenMobile: {
    border: "none",
    backgroundColor: "transparent",
    ...theme.fn.hover({
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[6]
          : theme.colors.gray[1],
    }),
  },

  textHidden: {
    [theme.fn.smallerThan("sm")]: {
      display: "none",
    },
  },
}));
//green red blue
const Interact = ({
  retweeted,
  liked,
  saved,
  id,
  setDisplayReply,
}: {
  retweeted: boolean;
  liked: boolean;
  saved: boolean;
  id: string;
  setDisplayReply: (value: boolean) => void;
}) => {
  const { classes } = useStyles();
  const [likeTweet] = useLikeTweetMutation();
  const [removeLike] = useRemoveLikeMutation();
  const [removeSave] = useRemoveBookmarkMutation();
  const [saveTweet] = useSaveTweetMutation();
  const [removeRetweet] = useRemoveRetweetMutation();
  const [retweetTweet] = useRetweetTweetMutation();

  const dispatch: AppDispatch = useDispatch();
  const [token] = useCheckTokenMutation();
  const user = useSelector((state: RootState) => state.auth.userInfo);

  const likeRef = useRef<HTMLButtonElement>(null);
  const saveRef = useRef<HTMLButtonElement>(null);
  const retweetRef = useRef<HTMLButtonElement>(null);

  async function handleLike() {
    if (liked) {
      try {
        await removeLike({ id }).unwrap();
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        if (error.data.error === "token expired") {
          try {
            if (user) {
              const res = await token({
                username: user?.username,
                id: user?.id,
              }).unwrap();
              dispatch(changeToken(res));
              likeRef.current?.click();
            }
          } catch (error) {
            toast.error("Session expired, please log in");
            dispatch(removeCredentials());
          }
        } else if (error.status === "PARSING_ERROR") {
          toast.error(error.data);
        } else if (error.data.message) toast.error(error.data.message);
        else toast.error("Something went wrong");
      }
    } else {
      try {
        await likeTweet({ id }).unwrap();
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        if (error.data.error === "token expired") {
          try {
            if (user) {
              const res = await token({
                username: user?.username,
                id: user?.id,
              }).unwrap();
              dispatch(changeToken(res));
              likeRef.current?.click();
            }
          } catch (error) {
            toast.error("Session expired, please log in");
            dispatch(removeCredentials());
          }
        } else if (error.status === "PARSING_ERROR") {
          toast.error(error.data);
        } else if (error.data.message) toast.error(error.data.message);
        else toast.error("Something went wrong");
      }
    }
  }

  async function handleSave() {
    if (saved) {
      try {
        await removeSave({ id }).unwrap();
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        if (error.data.error === "token expired") {
          try {
            if (user) {
              const res = await token({
                username: user?.username,
                id: user?.id,
              }).unwrap();
              dispatch(changeToken(res));
              saveRef.current?.click();
            }
          } catch (error) {
            toast.error("Session expired, please log in");
            dispatch(removeCredentials());
          }
        } else if (error.status === "PARSING_ERROR") {
          toast.error(error.data);
        } else if (error.data.message) toast.error(error.data.message);
        else toast.error("Something went wrong");
      }
    } else {
      try {
        await saveTweet({ id }).unwrap();
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        if (error.data.error === "token expired") {
          try {
            if (user) {
              const res = await token({
                username: user?.username,
                id: user?.id,
              }).unwrap();
              dispatch(changeToken(res));
              saveRef.current?.click();
            }
          } catch (error) {
            toast.error("Session expired, please log in");
            dispatch(removeCredentials());
          }
        } else if (error.status === "PARSING_ERROR") {
          toast.error(error.data);
        } else if (error.data.message) toast.error(error.data.message);
        else toast.error("Something went wrong");
      }
    }
  }

  async function handleRetweet() {
    if (retweeted) {
      try {
        await removeRetweet({ id }).unwrap();
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        if (error.data.error === "token expired") {
          try {
            if (user) {
              const res = await token({
                username: user?.username,
                id: user?.id,
              }).unwrap();
              dispatch(changeToken(res));
              retweetRef.current?.click();
            }
          } catch (error) {
            toast.error("Session expired, please log in");
            dispatch(removeCredentials());
          }
        } else if (error.status === "PARSING_ERROR") {
          toast.error(error.data);
        } else if (error.data.message) toast.error(error.data.message);
        else toast.error("Something went wrong");
      }
    } else {
      try {
        await retweetTweet({ id }).unwrap();
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        if (error.data.error === "token expired") {
          try {
            if (user) {
              const res = await token({
                username: user?.username,
                id: user?.id,
              }).unwrap();
              dispatch(changeToken(res));
              retweetRef.current?.click();
            }
          } catch (error) {
            toast.error("Session expired, please log in");
            dispatch(removeCredentials());
          }
        } else if (error.status === "PARSING_ERROR") {
          toast.error(error.data);
        } else if (error.data.message) toast.error(error.data.message);
        else toast.error("Something went wrong");
      }
    }
  }
  return (
    <Flex justify="space-between">
      <Button
        leftIcon={<IconMessageCircle />}
        className={classes.hiddenMobile}
        variant="default"
        size="xs"
        onClick={() => setDisplayReply(true)}
      >
        <Text className={classes.textHidden}>Comment</Text>
      </Button>

      <Button
        ref={retweetRef}
        leftIcon={<IconRefresh color={retweeted ? "green" : "gray"} />}
        className={classes.hiddenMobile}
        variant="default"
        size="xs"
        onClick={handleRetweet}
      >
        <Text color={retweeted ? "green" : ""} className={classes.textHidden}>
          {retweeted ? "Retweeted" : "Retweet"}
        </Text>
      </Button>

      <Button
        ref={likeRef}
        leftIcon={<IconHeart color={liked ? "red" : "gray"} />}
        className={classes.hiddenMobile}
        variant="default"
        size="xs"
        onClick={handleLike}
      >
        <Text color={liked ? "red" : ""} className={classes.textHidden}>
          {liked ? "Liked" : "Like"}
        </Text>
      </Button>

      <Button
        ref={saveRef}
        onClick={handleSave}
        leftIcon={<IconBookmark color={saved ? "blue" : "gray"} />}
        className={classes.hiddenMobile}
        variant="default"
        size="xs"
      >
        <Text color={saved ? "blue" : ""} className={classes.textHidden}>
          {saved ? "Saved" : "Save"}
        </Text>
      </Button>
    </Flex>
  );
};

export default Interact;
