import {
  Flex,
  Text,
  Avatar,
  Button,
  Popover,
  Group,
  Divider,
  useMantineColorScheme,
} from "@mantine/core";
import {
  IconChevronDown,
  IconLogout,
  IconSun,
  IconMoonStars,
} from "@tabler/icons-react";
import { useLogoutMutation } from "../slices/api/logApiSlice";
import { changeToken, removeCredentials } from "../slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast/headless";
import { AppDispatch, RootState } from "../store";
import { useCheckTokenMutation } from "../slices/api/userApiSlice";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";

const User = () => {
  const dispatch: AppDispatch = useDispatch();
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const [logout] = useLogoutMutation();
  const [token] = useCheckTokenMutation();
  const user = useSelector((state: RootState) => state.auth.userInfo);
  const btnRef = useRef<HTMLButtonElement>(null);
  const navigate = useNavigate();

  async function logoutUser() {
    try {
      await logout().unwrap();
      dispatch(removeCredentials());
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error.data.error === "token expired") {
        try {
          if (user) {
            const res = await token({
              username: user?.username,
              id: user?.id,
            }).unwrap();
            dispatch(changeToken(res));
            btnRef.current?.click();
          }
        } catch (error) {
          toast.error("Session expired, please log in");
          dispatch(removeCredentials());
          navigate("/login", { replace: true });
        }
      } else toast.error("Something went wrong");
    }
  }
  return (
    <Popover position="bottom-end" radius="md" width={200}>
      <Flex gap="xs" align="center" justify="center">
        <Avatar radius="md" size="md" src={user?.image} />
        <Text>{user?.name}</Text>
        <Popover.Target>
          <Button variant="subtle" color="gray" size="xs">
            <IconChevronDown />
          </Button>
        </Popover.Target>
      </Flex>
      <Popover.Dropdown>
        <Flex direction="column" gap="md">
          <Group position="left">
            {colorScheme === "dark" ? (
              <IconSun size="1.2rem" />
            ) : (
              <IconMoonStars size="1.2rem" />
            )}
            <Text
              style={{ cursor: "pointer" }}
              onClick={() => toggleColorScheme()}
            >
              {colorScheme === "dark" ? "Light" : "Dark"} Mode
            </Text>
          </Group>

          <Divider />
          <Group position="left">
            <IconLogout color="red" />
            <Text
              component="button"
              color="red"
              weight={500}
              ref={btnRef}
              style={{
                backgroundColor: "transparent",
                border: 0,
                cursor: "pointer",
              }}
              onClick={logoutUser}
            >
              {" "}
              Logout
            </Text>
          </Group>
        </Flex>
      </Popover.Dropdown>
    </Popover>
  );
};

export default User;
