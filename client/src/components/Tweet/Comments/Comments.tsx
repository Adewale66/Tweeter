import { Box, Avatar, Group, Text, Stack, Flex } from "@mantine/core";
import useStylesComment from "./styles";
import getTimeFormat from "../utils/getTime";
import { Link } from "react-router-dom";

interface CommentProps {
  comment: string;
  madeBy: {
    username: string;
    profileimage: string;
    name: string;
  };
  createdAt: string;
}

const Comments = ({ comment }: { comment: CommentProps }) => {
  const { classes } = useStylesComment();
  const formattedDate = getTimeFormat(comment.createdAt);

  return (
    <Box mt={6}>
      <Flex gap={10}>
        <Avatar alt="wale" radius="md" src={comment.madeBy.profileimage} />
        <Stack spacing="sm" className={classes.comments}>
          <Group align="center">
            <Text
              fz="0.85rem"
              fw={500}
              component={Link}
              to={`/${comment.madeBy.username}`}
            >
              {comment.madeBy.name}
            </Text>
            <Text fz="0.65rem" fw={500} c="dimmed">
              {formattedDate}
            </Text>
          </Group>
          <Text>{comment.comment}</Text>
        </Stack>
      </Flex>
    </Box>
  );
};

export default Comments;
