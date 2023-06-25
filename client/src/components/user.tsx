import {
  Flex,
  Text,
  Avatar,
  Button,
  Popover,
  Group,
  Divider,
} from "@mantine/core";
import {
  IconChevronDown,
  IconSettings,
  IconUser,
  IconLogout,
} from "@tabler/icons-react";
import { useLogoutMutation } from "../slices/api/logApiSlice";
import { removeCredentials } from "../slices/authSlice";
import { useDispatch } from "react-redux";
import { toast } from "react-hot-toast/headless";
import { AppDispatch } from "../store";

const User = ({ username }: { username: string }) => {
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
            <Text style={{ cursor: "pointer" }}>My Profile</Text>
          </Group>

          <Group position="left">
            <IconSettings />
            <Text style={{ cursor: "pointer" }}>Settings</Text>
          </Group>
          <Divider />
          <Group position="left">
            <IconLogout color="red" />
            <Text
              color="red"
              weight={500}
              style={{ cursor: "pointer" }}
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
