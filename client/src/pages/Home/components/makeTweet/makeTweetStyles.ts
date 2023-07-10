import { createStyles } from "@mantine/core";

const useStylesMakeTweet = createStyles((theme) => ({
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
  set: {
    ...theme.fn.hover({
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[5]
          : theme.colors.gray[1],
      cursor: "pointer",
      borderRadius: "0.5rem",
    }),
    padding: "0.5rem",
  },
  imgae: {
    ...theme.fn.hover({
      cursor: "pointer",
    }),
  },
}));

export default useStylesMakeTweet;
