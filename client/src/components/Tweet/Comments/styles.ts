import { createStyles } from "@mantine/core";

const useStylesComment = createStyles((theme) => ({
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
    width: "100%",
  },
}));

export default useStylesComment;
