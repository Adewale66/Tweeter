import { createStyles } from "@mantine/core";

const useStylesTweets = createStyles((theme) => ({
  container: {
    padding: "0",
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
    marginBottom: "3rem",
  },
  retweeted: {
    position: "relative",
    backgroundColor: theme.colorScheme === "light" ? "#e0e0e0" : "#1A1B1E",
    color: theme.colorScheme === "dark" ? theme.white : theme.colors.gray[6],
  },
  body: {
    padding: "1rem",
    display: "flex",
    flexDirection: "column",
    gap: "0.8rem",
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[6]
        : theme.colors.gray[0],
    borderRadius: "0.5rem",
  },
}));

export default useStylesTweets;
