import Tweet from "../components/Tweet/Tweet";
import { Container } from "@mantine/core";

const Bookmarks = () => {
  return (
    <Container mt={30}>
      <Tweet />
      <Tweet />
    </Container>
  );
};

export default Bookmarks;
