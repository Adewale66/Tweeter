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
import { Link } from "react-router-dom";

const User = () => {
  return (
    <Popover position="bottom-end" radius="md" width={200}>
      <Flex gap="xs" align="center" justify="center">
        <Avatar radius="md" size="md" src={null} />
        <Text>Adewale kujore</Text>
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
            <Text>My Profile</Text>
          </Group>

          <Group position="left">
            <IconSettings />
            <Text>Settings</Text>
          </Group>
          <Divider />
          <Group position="left">
            <IconLogout color="red" />
            <Text color="red" weight={500}>
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
