import { Flex, Button, ActionIcon, createStyles, Text } from "@mantine/core";
import {
  IconMessageCircle,
  IconRefresh,
  IconHeart,
  IconBookmark,
} from "@tabler/icons-react";

const useStyles = createStyles((theme) => ({
  hiddenMobile: {
    [theme.fn.smallerThan("sm")]: {
      display: "none",
    },
    border: "none",
    backgroundColor: "transparent",
    ...theme.fn.hover({
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[6]
          : theme.colors.gray[1],
    }),
  },

  hiddenDesktop: {
    [theme.fn.largerThan("sm")]: {
      display: "none",
    },
  },
}));

const Interact = () => {
  const { classes } = useStyles();
  return (
    <Flex justify="space-between">
      <Button
        leftIcon={<IconMessageCircle />}
        className={classes.hiddenMobile}
        variant="default"
        size="xs"
      >
        <Text>Comment</Text>
      </Button>

      <ActionIcon className={classes.hiddenDesktop}>
        <IconMessageCircle />
      </ActionIcon>

      <Button
        leftIcon={<IconRefresh />}
        className={classes.hiddenMobile}
        variant="default"
        size="xs"
      >
        <Text>Retweet</Text>
      </Button>
      <ActionIcon className={classes.hiddenDesktop}>
        <IconRefresh />
      </ActionIcon>

      <Button
        leftIcon={<IconHeart />}
        className={classes.hiddenMobile}
        variant="default"
        size="xs"
      >
        <Text>Like</Text>
      </Button>

      <ActionIcon className={classes.hiddenDesktop}>
        <IconHeart />
      </ActionIcon>

      <Button
        leftIcon={<IconBookmark />}
        className={classes.hiddenMobile}
        variant="default"
        size="xs"
      >
        <Text>Save</Text>
      </Button>

      <ActionIcon className={classes.hiddenDesktop}>
        <IconBookmark />
      </ActionIcon>
    </Flex>
  );
};

export default Interact;
