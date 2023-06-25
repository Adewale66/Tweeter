import { Avatar, createStyles, Box, Input, Flex } from "@mantine/core";
import { IconMessage } from "@tabler/icons-react";

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

const Reply = () => {
  const { classes, theme } = useStyles();
  return (
    <Box>
      <Flex align="center" gap={10}>
        <Avatar
          src="https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D&w=1000&q=80"
          alt="wale"
          radius="md"
        />

        <Input
          placeholder="Tweet your reply"
          className={classes.input}
          radius="md"
          variant="unstyled"
          rightSection={
            <IconMessage
              className={classes.image}
              color={theme.colorScheme === "dark" ? "white" : "black"}
            />
          }
        />
      </Flex>
    </Box>
  );
};

export default Reply;
