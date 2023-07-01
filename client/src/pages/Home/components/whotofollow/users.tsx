import { Avatar, Button, Flex, Stack, Text } from "@mantine/core";

import { IconUserPlus } from "@tabler/icons-react";

function UserCard() {
  return (
    <Stack>
      <Flex gap={15} align="center">
        <Avatar
          src="https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D&w=1000&q=80"
          alt="wale"
          radius="md"
        />
        <Stack spacing={1}>
          <Text fz={16} fw={500}>
            Adewale Kujore
          </Text>
          <Text fz={12} fw={500}>
            230k followers
          </Text>
        </Stack>
        <Button
          h={32}
          color="#2F80ED"
          leftIcon={<IconUserPlus size={18} />}
          size="xs"
          ml="auto"
        >
          Follow
        </Button>
        {/* <Button h={32} variant="default" size="xs" ml="auto">
          Following
        </Button> */}
      </Flex>
      <Text fz={14} fw={500}>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Modi!
      </Text>
    </Stack>
  );
}

export default UserCard;
