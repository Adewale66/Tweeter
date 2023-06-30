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
  },
}));

const Comments = () => {
  const { classes } = useStyles();
  return (
    <Box mt={6}>
      <Flex gap={10}>
        <Avatar
          src="http://localhost:8000/uploads/tree-736885_1280.jpg"
          alt="wale"
          radius="md"
        />
        <Stack spacing="sm" className={classes.comments}>
          <Group align="center">
            <Text fz="0.85rem" fw={500}>
              Adewale Kujore
            </Text>
            <Text fz="0.65rem" fw={500} c="dimmed">
              24 August 20:43
            </Text>
          </Group>
          <Text>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ullam,
          </Text>
        </Stack>
      </Flex>
    </Box>
  );
};

export default Comments;
