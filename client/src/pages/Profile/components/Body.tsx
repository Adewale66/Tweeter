import { Box, Flex, Stack, Text, createStyles } from "@mantine/core";
import Tweet from "../../../components/Tweet/Tweet";

const useStyles = createStyles((theme) => ({
  container: {
    margin: "0 auto",
    color: theme.colorScheme === "dark" ? theme.white : theme.black,

    width: "60%",
    [theme.fn.smallerThan("md")]: {
      width: "90%",
    },
  },
  stack: {
    borderRadius: "0.5rem",
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[6]
        : theme.colors.gray[0],
    [theme.fn.smallerThan("md")]: {
      flexGrow: 1,
    },
  },
  text: {
    ...theme.fn.hover({
      cursor: "pointer",
    }),
  },
}));

const Body = () => {
  const { classes } = useStyles();
  return (
    <Box className={classes.container}>
      <Flex justify="space-between" wrap="wrap" gap={12}>
        <Stack w={250} h={184} p={12} className={classes.stack}>
          <Text fz={14} fw={600} className={classes.text}>
            Tweets
          </Text>
          <Text fz={14} fw={600} className={classes.text}>
            Tweets & replies
          </Text>
          <Text fz={14} fw={600} className={classes.text}>
            Media
          </Text>
          <Text fz={14} fw={600} className={classes.text}>
            Likes
          </Text>
        </Stack>
        <div>
          <Tweet />
          <Tweet />
        </div>
      </Flex>
    </Box>
  );
};

export default Body;
