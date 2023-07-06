import {
  Flex,
  Text,
  Avatar,
  Button,
  Popover,
  Group,
  Divider,
} from "@mantine/core";
import { IconChevronDown, IconUser, IconLogout } from "@tabler/icons-react";
import { useLogoutMutation } from "../slices/api/logApiSlice";
import { changeToken, removeCredentials } from "../slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast/headless";
import { AppDispatch, RootState } from "../store";
import { Link } from "react-router-dom";
import { useCheckTokenMutation } from "../slices/api/userApiSlice";
import { useRef } from "react";

const User = ({ username }: { username: string }) => {
  const dispatch: AppDispatch = useDispatch();
  const [logout] = useLogoutMutation();
  const [token] = useCheckTokenMutation();
  const user = useSelector((state: RootState) => state.auth.userInfo);
  const btnRef = useRef<HTMLButtonElement>(null);

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
        }
      } else toast.error("Something went wrong");
    }
  }
  return (
    <Popover position="bottom-end" radius="md" width={200}>
      <Flex gap="xs" align="center" justify="center">
        <Avatar radius="md" size="md" src={null} />
        <Text>{username}</Text>
        <Popover.Target>
          <Button variant="subtle" color="gray" size="xs">
            <IconChevronDown />
          </Button>
        </Popover.Target>
      </Flex>
      <Popover.Dropdown>
        <Flex direction="column" gap="md">
          <Group position="left">
            <IconUser />
            <Text
              style={{ cursor: "pointer" }}
              component={Link}
              to={`/${username}`}
            >
              My Profile
            </Text>
          </Group>

          <Group position="left"></Group>
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
