import Tweet from "../../components/Tweet/Tweet";
import { useGetHomeTweetsQuery } from "../../slices/api/userApiSlice";

import MakeTweet from "./components/MakeTweet";
import Trends from "./components/Trends";

const Home = () => {
  const { data, isLoading, isError, isFetching } = useGetHomeTweetsQuery();

  if (isLoading) return <h1>loadig...</h1>;
  return (
    <div style={{ position: "relative", padding: "1.25rem 0.625rem" }}>
      <MakeTweet />
      {isFetching && <h1>loading...</h1>}
      {data?.map((t) => (
        <Tweet key={t.tweet._id} tweet={t} />
      ))}

      <div style={{ position: "absolute", top: "1.25rem", right: "4.375rem" }}>
        <Trends />
      </div>
    </div>
  );
};

export default Home;
