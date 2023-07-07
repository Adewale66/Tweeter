import { Avatar, createStyles, Box, Input, Flex, Button } from "@mantine/core";
import { IconMessage } from "@tabler/icons-react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { useRef, useState } from "react";
import { useMakeCommentMutation } from "../../slices/api/tweetApiSlice";
import toast from "react-hot-toast";
import { changeToken, removeCredentials } from "../../slices/authSlice";
import { useCheckTokenMutation } from "../../slices/api/userApiSlice";

const useStyles = createStyles((theme) => ({
  container: {
    backgroundColor: theme.colors.gray[1],
  },

  input: {
    flexGrow: 1,
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[8]
        : theme.colors.gray[1],
    padding: "0 0.5rem",
    borderRadius: "0.5rem",
  },
  image: {
    ...theme.fn.hover({
      cursor: "pointer",
    }),
  },
}));

const Reply = ({
  id,
  showCommentBar,
}: {
  id: string;
  showCommentBar: boolean;
}) => {
  const { classes, theme } = useStyles();
  const user = useSelector((state: RootState) => state.auth.userInfo);
  const [comment, setComment] = useState("");
  const [makeComment] = useMakeCommentMutation();
  const btnRef = useRef<HTMLButtonElement>(null);
  const [token] = useCheckTokenMutation();
  const dispatch: AppDispatch = useDispatch();

  async function replyTweet() {
    try {
      await makeComment({
        id,
        comment: comment,
      }).unwrap();
      setComment("");
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
            btnRef.current?.click();
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

  return (
    <>
      {showCommentBar && (
        <Box>
          <Flex align="center" gap={10}>
            <Avatar alt="wale" radius="md" src={user?.image} />
            <Input
              placeholder="Tweet your reply"
              className={classes.input}
              radius="md"
              variant="unstyled"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <Button
              ref={btnRef}
              onClick={replyTweet}
              variant="default"
              style={{
                backgroundColor: "transparent",
                border: "none",
                padding: 0,
              }}
            >
              <IconMessage
                className={classes.image}
                color={theme.colorScheme === "dark" ? "white" : "black"}
              />
            </Button>
          </Flex>
        </Box>
      )}
    </>
  );
};

export default Reply;
