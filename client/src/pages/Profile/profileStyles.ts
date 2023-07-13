import { createStyles } from "@mantine/core";

const useStylesProfile = createStyles((theme) => ({
  image: {
    [theme.fn.smallerThan("sm")]: {
      width: "7.25rem",
      height: "7.25rem",
      margin: 0,
    },
    width: "9.25rem",
    height: "9.25rem",
    margin: "0 1.625rem 0 0",
    position: "absolute",
    top: "-3rem",
  },
  container: {
    margin: "0 auto",
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[6]
        : theme.colors.gray[0],
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
    display: "flex",
    position: "relative",
    top: "-3rem",
    width: "60%",
    flexWrap: "wrap",
    borderRadius: "0.75rem",
    padding: "0.8rem",
    [theme.fn.smallerThan("md")]: {
      justifyContent: "center",
      gap: "0.5rem",
      alignItems: "center",
      width: "90%",
    },
  },
  btn: {
    marginLeft: "auto",
    [theme.fn.smallerThan("md")]: {
      marginLeft: "0",
    },
  },
  flexContainer: {
    [theme.fn.smallerThan("md")]: {
      gap: "0.25rem",
      justifyContent: "center",
    },
  },
  text: {
    [theme.fn.smallerThan("md")]: {
      textAlign: "center",
    },
  },
  username: {
    marginRight: "1.625rem",
    [theme.fn.smallerThan("md")]: {
      marginRight: "0",
    },
    [theme.fn.smallerThan("xl")]: {
      marginRight: "1.625rem",
    },
  },
  stack: {
    marginLeft: "10.5rem",
    width: "15rem",

    [theme.fn.smallerThan("md")]: {
      marginTop: "5.5rem",
      marginLeft: "0",
    },
    [theme.fn.smallerThan("sm")]: {
      marginTop: "3.5rem",
      marginLeft: "0",
    },
  },

  modal: {
    ...theme.fn.hover({
      cursor: "pointer",
    }),
  },
}));

export default useStylesProfile;
