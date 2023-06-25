import {
  Avatar,
  Button,
  Container,
  Divider,
  Flex,
  Stack,
  Text,
  Textarea,
  createStyles,
} from "@mantine/core";
import { IconPhoto, IconWorld } from "@tabler/icons-react";

const useStyles = createStyles((theme) => ({
  container: {
    borderRadius: "0.5rem",
    color: theme.colorScheme === "dark" ? theme.white : theme.black,

    marginBottom: "2rem",
    padding: "0",
  },
  textArea: {
    flexGrow: 1,
    background: "transparent",
  },
  input: {
    background: "transparent",
  },
  flexContainer: {
    borderRadius: "0.5rem",
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.white,
  },
  btn: {
    margin: "0 0 0 auto",
    backgroundColor: "#2F80ED",
  },
  text: {
    ...theme.fn.hover({
      cursor: "pointer",
    }),
    color: "#2F80ED",
  },

  hiddenDesktop: {
    [theme.fn.largerThan("sm")]: {
      display: "none",
    },
  },
  hiddenMobile: {
    [theme.fn.smallerThan("sm")]: {
      display: "none",
    },
  },
}));

const MakeTweet = () => {
  const { classes, theme } = useStyles();
  return (
    <Container size="xs" className={classes.container}>
      <Flex
        direction="column"
        gap="sm"
        p={12}
        className={classes.flexContainer}
      >
        <Text size="xs" fz={12} fw={600}>
          Tweet Something
        </Text>
        <Divider color={theme.colorScheme === "dark" ? "gray.7" : "gray.3"} />
        <Flex gap={8}>
          <Avatar
            src="https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D&w=1000&q=80"
            alt="wale"
            radius="md"
          />
          <Stack className={classes.textArea} spacing="xs">
            <Textarea
              placeholder="What's happening?"
              variant="unstyled"
              className={classes.input}
            />
            <Flex gap={9} align="center" className={classes.hiddenMobile}>
              <IconPhoto size={20} color="#2F80ED" />
              <IconWorld size={20} color="#2F80ED" />
              <Text size="xs" fz={12} fw={500} className={classes.text}>
                Everyone can reply
              </Text>
              <Button className={classes.btn}>Tweet</Button>
            </Flex>
          </Stack>
        </Flex>
        <Flex gap={9} align="center" className={classes.hiddenDesktop}>
          <IconPhoto size={20} color="#2F80ED" />
          <IconWorld size={20} color="#2F80ED" />
          <Text size="xs" fz={12} fw={500} className={classes.text}>
            Everyone can reply
          </Text>
          <Button className={classes.btn}>Tweet</Button>
        </Flex>
      </Flex>
    </Container>
  );
};

export default MakeTweet;
