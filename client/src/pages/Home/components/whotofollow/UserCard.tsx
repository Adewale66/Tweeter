import { Avatar, Button, Divider, Flex, Stack, Text } from "@mantine/core";

import { IconUserPlus } from "@tabler/icons-react";

function UserCard({
  username,
  profileimage,
  followed,
  id,
}: {
  username: string;
  profileimage: string;
  followed: boolean;
  id: string;
}) {
  return (
    <Stack>
      <Flex gap={15} align="center">
        <Avatar src={profileimage} alt="wale" radius="md" />
        <Stack spacing={1}>
          <Text fz={16} fw={500}>
            {username}
          </Text>
        </Stack>
        {!followed && (
          <Button
            h={32}
            color="#2F80ED"
            leftIcon={<IconUserPlus size={18} />}
            size="xs"
            ml="auto"
          >
            Follow
          </Button>
        )}
        {followed && (
          <Button h={32} variant="default" size="xs" ml="auto">
            Following
          </Button>
        )}
      </Flex>
      <Divider />
    </Stack>
  );
}

export default UserCard;
