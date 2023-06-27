import {
  Box,
  Avatar,
  Group,
  Text,
  Stack,
  Flex,
  createStyles,
  Image,
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
          src="https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D&w=1000&q=80"
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
          <Image
            radius="md"
            alt="image"
            mx="auto"
            src="https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D&w=1000&q=80"
          />
        </Stack>
      </Flex>
    </Box>
  );
};

export default Comments;
