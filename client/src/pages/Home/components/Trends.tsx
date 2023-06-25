import { Divider, Stack, Text, createStyles } from "@mantine/core";

const useStyles = createStyles((theme) => ({
  container: {
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[6]
        : theme.colors.gray[0],
    padding: "1rem",
    borderRadius: "0.5rem",
    color: theme.colorScheme === "dark" ? theme.white : theme.black,

    marginBottom: "2rem",
    [theme.fn.smallerThan("sm")]: {
      display: "none",
    },
  },

  stack: {
    ...theme.fn.hover({
      cursor: "pointer",
    }),
  },
}));

const Trends = () => {
  const { classes } = useStyles();
  return (
    <Stack className={classes.container} w={320}>
      <Stack spacing={5}>
        <Text fz={12} fw={600}>
          Trends for you
        </Text>
        <Divider />
      </Stack>
      <Stack spacing={5} className={classes.stack}>
        <Text fz={16} fw={600}>
          #programming
        </Text>
        <Text fz={12} fw={500}>
          21k Tweets
        </Text>
      </Stack>
      <Stack spacing={5} className={classes.stack}>
        <Text fz={16} fw={600}>
          #devchallanges
        </Text>
        <Text fz={12} fw={500}>
          123k Tweets
        </Text>
      </Stack>
      <Stack spacing={5} className={classes.stack}>
        <Text fz={16} fw={600}>
          #frontend
        </Text>
        <Text fz={12} fw={500}>
          34k Tweets
        </Text>
      </Stack>
      <Stack spacing={5} className={classes.stack}>
        <Text fz={16} fw={600}>
          #100DaysOfCode
        </Text>
        <Text fz={12} fw={500}>
          4k Tweets
        </Text>
      </Stack>
      <Stack spacing={5} className={classes.stack}>
        <Text fz={16} fw={600}>
          #learntocode
        </Text>
        <Text fz={12} fw={500}>
          4k Tweets
        </Text>
      </Stack>
    </Stack>
  );
};

export default Trends;
