import Tweet from "../../components/Tweet/Tweet";
import MakeTweet from "./components/MakeTweet";
import Trends from "./components/Trends";
import WhotoFollow from "./components/whotofollow/WhotoFollow";

const Home = () => {
  return (
    <div className="home">
      <MakeTweet />
      <Tweet />
      <Tweet />
      <Tweet />
      <Tweet />
      <Tweet />
      <Tweet />
      <div className="side-content">
        <Trends />
        <WhotoFollow />
      </div>
    </div>
  );
};

export default Home;
