import {
  Avatar,
  Container,
  Group,
  Text,
  Image,
  Flex,
  Divider,
} from "@mantine/core";

const Tweet = () => {
  return (
    <Container
      sx={() => ({
        backgroundColor: "white",
        padding: "1rem",
        color: "black",
        display: "flex",
        flexDirection: "column",
        gap: "0.5rem",
      })}
      size="xs"
    >
      <Group>
        <Avatar
          src="https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D&w=1000&q=80"
          alt="wale"
          radius="md"
        />
        <div>
          <Text fz="sm">Adewale Kujore</Text>
          <Text fz="xs" c="dimmed">
            August 24th at 20:43
          </Text>
        </div>
      </Group>
      <Text>This is a Tweet.</Text>
      <Image
        src="https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D&w=1000&q=80"
        mx="auto"
        radius="md"
        alt="random"
      />
      <Flex gap={8}>
        <Text fz="xs" ml="auto" color="grey">
          449 comments
        </Text>
        <Text fz="xs" color="grey">
          {" "}
          59k Retweets
        </Text>
        <Text fz="xs" color="grey">
          234 Saved
        </Text>
      </Flex>
      <Divider />
    </Container>
  );
};

export default Tweet;
