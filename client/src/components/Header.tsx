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
import { Link } from "react-router-dom";
import User from "./user";
import { ThemeToggle } from "./ChangeTheme";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import toast from "react-hot-toast";
import { useLogoutMutation } from "../slices/api/logApiSlice";
import { removeCredentials } from "../slices/authSlice";

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
  const user = useSelector((state: RootState) => state.auth.userInfo);

  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] =
    useDisclosure(false);
  const { classes, theme } = useStyles();
  const { colorScheme } = useMantineColorScheme();
  const dispatch: AppDispatch = useDispatch();
  const [logout] = useLogoutMutation();

  async function logoutUser() {
    try {
      await logout()
        .unwrap()
        .then(() => {
          toast.success("Logged out");
          dispatch(removeCredentials());
        })
        .catch((err) => {
          if (err.status === 401)
            toast.error("Token expired please login again");
        });
    } catch (error) {
      toast.error("Something went wrong");
    }
  }

  return (
    <Box>
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
            {user && <User username={user.username} />}
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
          {user && (
            <Link to={"/profile"} className={classes.link}>
              Profile
            </Link>
          )}

          <Link to={"/explore"} className={classes.link}>
            Explore
          </Link>
          <Link to={"/bookmarks"} className={classes.link}>
            Bookmarks
          </Link>

          {user && (
            <Link to={"/settings"} className={classes.link}>
              Settings
            </Link>
          )}

          {user && (
            <Text className={classes.link} onClick={logoutUser}>
              Logout
            </Text>
          )}

          <Divider
            my="sm"
            color={theme.colorScheme === "dark" ? "dark.5" : "gray.1"}
          />

          {!user && (
            <Group position="center" grow pb="xl" px="md">
              <Button
                component={Link}
                to={"/login"}
                size="md"
                variant="outline"
              >
                Log in
              </Button>
            </Group>
          )}
        </ScrollArea>
      </Drawer>
    </Box>
  );
}
