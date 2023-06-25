import { Divider, Stack, Text, createStyles } from "@mantine/core";
import UserCard from "./users";

const useStyles = createStyles((theme) => ({
  container: {
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[6]
        : theme.colors.gray[0],
    [theme.fn.smallerThan("sm")]: {
      display: "none",
    },
    padding: "1rem",
    borderRadius: "0.5rem",
  },
}));

const WhotoFollow = () => {
  const { classes } = useStyles();

  return (
    <Stack className={classes.container} maw={320}>
      <Stack spacing={5}>
        <Text fz={12} fw={600}>
          Who to follow
        </Text>
        <Divider />
      </Stack>
      <Stack>
        <UserCard />
        <Divider />
        <UserCard />
      </Stack>
    </Stack>
  );
};

export default WhotoFollow;
