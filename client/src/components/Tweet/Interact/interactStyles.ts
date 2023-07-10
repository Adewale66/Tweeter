import { createStyles } from "@mantine/core";

const useStylesInteract = createStyles((theme) => ({
  hiddenMobile: {
    border: "none",
    backgroundColor: "transparent",
    ...theme.fn.hover({
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[6]
          : theme.colors.gray[1],
    }),
  },

  textHidden: {
    [theme.fn.smallerThan("sm")]: {
      display: "none",
    },
  },
}));

export default useStylesInteract;
