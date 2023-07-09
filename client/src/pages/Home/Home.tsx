import { useSelector } from "react-redux";
import Tweet from "../../components/Tweet/Tweet";
import {
  useGetHomeTweetsQuery,
  useGetLoggeduserQuery,
} from "../../slices/api/userApiSlice";
import { RootState } from "../../store";

import MakeTweet from "./components/MakeTweet";
import Trends from "./components/Trends";

const Home = () => {
  const { data, isLoading, isFetching } = useGetHomeTweetsQuery();
  const user = useSelector((state: RootState) => state.auth.userInfo);

  const { data: loggeduser } = useGetLoggeduserQuery({
    id: user?.username as string,
  });

  const ids = loggeduser?.tweets.map((t) => {
    return {
      id: t.tweet._id,
      retweeted: t.retweeted,
      liked: t.liked,
      saved: t.saved,
    };
  });

  if (isLoading) return <h1>loadig...</h1>;
  return (
    <div style={{ position: "relative", padding: "1.25rem 0.625rem" }}>
      <MakeTweet />
      {data?.map((t) => (
        <Tweet key={t.tweet._id} tweet={t} ids={ids ? ids : []} />
      ))}

      <div style={{ position: "absolute", top: "1.25rem", right: "4.375rem" }}>
        <Trends />
      </div>
    </div>
  );
};

export default Home;
