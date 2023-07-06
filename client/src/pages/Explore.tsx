import { Container, Autocomplete } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import Tweet from "../components/Tweet/Tweet";

const Explore = () => {
  return (
    <Container>
      <Autocomplete
        icon={<IconSearch />}
        placeholder="Search"
        data={[" a", "b"]}
        mb={17}
        mt={30}
        shadow="md"
        radius={8}
        transitionProps={{
          transition: "pop-top-left",
          duration: 80,
          timingFunction: "ease",
        }}
      />
    </Container>
  );
};

export default Explore;
