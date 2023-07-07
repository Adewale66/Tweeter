import { Container, Autocomplete } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import Tweet from "../components/Tweet/Tweet";
import { useGetExploreTweetsQuery } from "../slices/api/userApiSlice";

const Explore = () => {
  const { data, isLoading } = useGetExploreTweetsQuery();

  if (isLoading) return <div>Loading...</div>;
  console.log(data);

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
      {/* {data?.map((tweet) => (
        <Tweet key={tweet.tweet._id} tweet={tweet} />
      ))} */}
    </Container>
  );
};

export default Explore;
