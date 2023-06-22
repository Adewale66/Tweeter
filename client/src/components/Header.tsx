import {
  createStyles,
  Header,
  Group,
  Button,
  Divider,
  Box,
  Burger,
  Drawer,
  ScrollArea,
  rem,
  Text,
  useMantineColorScheme,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import logo from "../assets/tweeter.svg";
import lightLogo from "../assets/tweeter-light.svg";
import { memo } from "react";
import { Link } from "react-router-dom";
import LoginModal from "./Login";
import User from "./user";
import { ThemeToggle } from "./ChangeTheme";

const useStyles = createStyles((theme) => ({
  link: {
    display: "flex",
    alignItems: "center",
    height: "100%",
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
    textDecoration: "none",
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
    fontWeight: 500,
    fontSize: theme.fontSizes.sm,

    [theme.fn.smallerThan("sm")]: {
      height: rem(42),
      display: "flex",
      alignItems: "center",
      width: "100%",
    },

    ...theme.fn.hover({
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
    }),
  },

  subLink: {
    width: "100%",
    padding: `${theme.spacing.xs} ${theme.spacing.md}`,
    borderRadius: theme.radius.md,

    ...theme.fn.hover({
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[7]
          : theme.colors.gray[0],
    }),

    "&:active": theme.activeStyles,
  },

  dropdownFooter: {
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[7]
        : theme.colors.gray[0],
    margin: `calc(${theme.spacing.md} * -1)`,
    marginTop: theme.spacing.sm,
    padding: `${theme.spacing.md} calc(${theme.spacing.md} * 2)`,
    paddingBottom: theme.spacing.xl,
    borderTop: `${rem(1)} solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[1]
    }`,
  },

  hiddenMobile: {
    [theme.fn.smallerThan("sm")]: {
      display: "none",
    },
  },

  hiddenDesktop: {
    [theme.fn.largerThan("sm")]: {
      display: "none",
    },
  },
}));

export function HeaderMegaMenu() {
  const [opened, { open, close }] = useDisclosure(false);

  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] =
    useDisclosure(false);
  const { classes, theme } = useStyles();
  const { colorScheme } = useMantineColorScheme();

  return (
    <Box>
      <LoginModal opened={opened} close={close} />
      <Header height={60} px="md">
        <Group position="apart" sx={{ height: "100%" }}>
          <img src={colorScheme === "dark" ? lightLogo : logo} alt="logo" />
          <Group
            sx={{ height: "100%" }}
            spacing={0}
            className={classes.hiddenMobile}
          >
            <Link to={"/"} className={classes.link}>
              Home
            </Link>
            <Link to={"/explore"} className={classes.link}>
              Explore
            </Link>
            <Link to={"/bookmarks"} className={classes.link}>
              Bookmarks
            </Link>
          </Group>

          <Group className={classes.hiddenMobile}>
            <User />
            {/* <Button onClick={open} size="md">
              Log in
            </Button> */}
          </Group>

          <Burger
            opened={drawerOpened}
            onClick={toggleDrawer}
            className={classes.hiddenDesktop}
          />
        </Group>
      </Header>

      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        size="100%"
        padding="md"
        title="Navigation"
        className={classes.hiddenDesktop}
        zIndex={1000000}
      >
        <ScrollArea h={`calc(100vh - ${rem(60)})`} mx="-md">
          <Divider
            my="sm"
            color={theme.colorScheme === "dark" ? "dark.5" : "gray.1"}
          />

          <ThemeToggle />
          <Link to={"/"} className={classes.link}>
            Home
          </Link>
          <Link to={"/"} className={classes.link}>
            Profile
          </Link>
          <Link to={"/explore"} className={classes.link}>
            Explore
          </Link>
          <Link to={"/bookmarks"} className={classes.link}>
            Bookmarks
          </Link>
          <Link to={"/bookmarks"} className={classes.link}>
            Settings
          </Link>
          <Link to={"/bookmarks"} className={classes.link}>
            <Text color="red">Logout</Text>
          </Link>

          <Divider
            my="sm"
            color={theme.colorScheme === "dark" ? "dark.5" : "gray.1"}
          />

          {/* <Group position="center" grow pb="xl" px="md">
            <Button component={Link} to={"/login"} size="md" variant="outline">
              Log in
            </Button>
          </Group> */}
        </ScrollArea>
      </Drawer>
    </Box>
  );
}

export const MemoizedHeaderMegaMenu = memo(HeaderMegaMenu);
