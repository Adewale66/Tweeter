import {
  Avatar,
  Button,
  Flex,
  Stack,
  Text,
  Image,
  createStyles,
} from "@mantine/core";

import { IconUserPlus } from "@tabler/icons-react";

const useStyles = createStyles((theme) => ({
  container: {
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
    [theme.fn.smallerThan("sm")]: {
      display: "none",
    },
  },
}));

function UserCard() {
  const { classes } = useStyles();
  return (
    <Stack className={classes.container} maw={350}>
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
          <Text fz={11} fw={500}>
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
      </Flex>
      <Text fz={11} fw={500}>
        Lorem ipsum dolor sit amet consectetur adipisicing.
      </Text>
      <Image
        src="https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D&w=1000&q=80"
        radius="md"
        alt="random"
        mah={200}
        fit="fill"
        placeholder="blur"
      />
    </Stack>
  );
}

export default UserCard;
