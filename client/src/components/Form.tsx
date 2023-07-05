import { useToggle, upperFirst } from "@mantine/hooks";
import { useForm } from "@mantine/form";
import {
  TextInput,
  PasswordInput,
  Text,
  Paper,
  Group,
  Button,
  Anchor,
  Stack,
  LoadingOverlay,
  createStyles,
} from "@mantine/core";
import { useLoginMutation } from "../slices/api/logApiSlice";
import { useDispatch } from "react-redux";
import { setCredentials } from "../slices/authSlice";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useRegisterUserMutation } from "../slices/api/userApiSlice";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { useEffect } from "react";

const useStyles = createStyles((theme) => ({
  container: {
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[6]
        : theme.colors.gray[0],
    minHeight: "100vh",
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
}));

export function AuthenticationForm() {
  const [type, toggle] = useToggle(["login", "register"]);
  let visible = false;
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.auth.userInfo);

  const form = useForm({
    initialValues: {
      username: "",
      name: "",
      password: "",
    },
    validate: {
      password: (val) =>
        val.length <= 1
          ? "Password should include at least 6 characters"
          : null,
    },
  });

  const [login, { isLoading }] = useLoginMutation();
  const [register, { isLoading: isLoading2 }] = useRegisterUserMutation();
  const dispatch = useDispatch();
  const { classes } = useStyles();

  useEffect(() => {
    if (user) navigate("/");
  }, [user, navigate]);

  async function handleSubmit() {
    const { name, username, password } = form.values;
    if (type === "login") {
      try {
        const res = await login({ username, password }).unwrap();
        dispatch(setCredentials(res));
        toast.success("Welcome back");
        form.reset();
        navigate("/");
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        if (error.status === "PARSING_ERROR") toast.error(error.data);
        else toast.error("Invalid username or password");
      }
    } else {
      try {
        await register({ name, username, password }).unwrap();
        const res = await login({ username, password }).unwrap();
        dispatch(setCredentials(res));
        toast.success("Registration successful");
        form.reset();
      } catch (error) {
        console.log(error);
        toast.error("Username already exists");
      }
    }
  }

  if (isLoading) visible = true;
  if (isLoading2) visible = true;

  return (
    <Paper className={classes.container}>
      <LoadingOverlay visible={visible} overlayBlur={2} />
      <Text size="lg" weight={500}>
        Welcome to Tweeter!
      </Text>
      <br />

      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack miw={300} mih={300} spacing={40} justify="center">
          {type === "register" && (
            <TextInput
              label="Name"
              required
              placeholder="Your name"
              value={form.values.name}
              onChange={(event) =>
                form.setFieldValue("name", event.currentTarget.value)
              }
              radius="md"
            />
          )}

          <TextInput
            required
            label="Username"
            color="red"
            placeholder="Username"
            value={form.values.username}
            onChange={(event) =>
              form.setFieldValue("username", event.currentTarget.value)
            }
            radius="md"
          />

          <PasswordInput
            required
            label="Password"
            placeholder="Your password"
            value={form.values.password}
            onChange={(event) =>
              form.setFieldValue("password", event.currentTarget.value)
            }
            error={
              form.errors.password &&
              "Password should include at least 6 characters"
            }
            radius="md"
          />
        </Stack>

        <Group position="apart" mt="xl">
          <Anchor
            component="button"
            type="button"
            color="dimmed"
            onClick={() => toggle()}
            size="xs"
          >
            {type === "register"
              ? "Already have an account? Login"
              : "Don't have an account? Register"}
          </Anchor>
          <Button type="submit" radius="xl">
            {upperFirst(type)}
          </Button>
        </Group>
      </form>
    </Paper>
  );
}
