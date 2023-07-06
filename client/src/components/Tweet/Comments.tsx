import {
  Box,
  Avatar,
  Group,
  Text,
  Stack,
  Flex,
  createStyles,
} from "@mantine/core";

const useStyles = createStyles((theme) => ({
  button: {
    border: "none",
    padding: "0",
    backgroundColor: "transparent",
    ...theme.fn.hover({
      cursor: "pointer",
      backgroundColor:
        theme.colorScheme === "dark" ? theme.colors.dark[7] : "white",
    }),
  },

  comments: {
    padding: "0.5rem",
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[7] : "white",
    borderRadius: "0.5rem",
    width: "100%",
  },
}));

const Comments = ({
  id,
  comment,
}: {
  id: string;
  comment: {
    comment: string;
    madeBy: {
      username: string;
      profileimage: string;
    };
    createdAt: string;
  };
}) => {
  const { classes } = useStyles();
  const date = new Date(comment.createdAt);
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
  return (
    <Box mt={6}>
      <Flex gap={10}>
        <Avatar alt="wale" radius="md" src={comment.madeBy.profileimage} />
        <Stack spacing="sm" className={classes.comments}>
          <Group align="center">
            <Text fz="0.85rem" fw={500}>
              {comment.madeBy.username}
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
