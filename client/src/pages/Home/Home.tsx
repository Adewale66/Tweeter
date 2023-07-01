import Tweet from "../../components/Tweet/Tweet";
import MakeTweet from "./components/MakeTweet";
import Trends from "./components/Trends";
import WhotoFollow from "./components/whotofollow/WhotoFollow";

const Home = () => {
  return (
    <div style={{ position: "relative", padding: "1.25rem 0.625rem" }}>
      <MakeTweet />
      <Tweet />
      <Tweet />
      <Tweet />
      <Tweet />
      <Tweet />
      <Tweet />
      <div style={{ position: "absolute", top: "1.25rem", right: "4.375rem" }}>
        <Trends />
        <WhotoFollow />
      </div>
    </div>
  );
};

export default Home;
