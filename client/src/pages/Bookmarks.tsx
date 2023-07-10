import Tweet from "../components/Tweet/Tweet";
import { Container, Loader } from "@mantine/core";
import {
  useGetBookmarksQuery,
  useGetLoggeduserQuery,
} from "../slices/api/userApiSlice";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { useDocumentTitle } from "@mantine/hooks";

const Bookmarks = () => {
  const { data, isLoading } = useGetBookmarksQuery();
  const user = useSelector((state: RootState) => state.auth.userInfo);
  const { data: loggeduser } = useGetLoggeduserQuery({
    id: user?.username as string,
  });
  useDocumentTitle("Bookmarks/ Tweeter");

  const ids = loggeduser?.tweets.map((t) => {
    return {
      id: t.tweet._id,
      retweeted: t.retweeted,
      liked: t.liked,
      saved: t.saved,
    };
  });
  if (isLoading)
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
        }}
      >
        <Loader variant="bars" />
      </div>
    );

  return (
    <Container mt={30}>
      {data &&
        data?.length > 0 &&
        data?.map((tweet) => (
          <Tweet key={tweet.timeMade} tweet={tweet} ids={ids ? ids : []} />
        ))}
      {data && data?.length === 0 && (
        <div
          style={{
            maxWidth: "400px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            margin: "0 auto",
          }}
        >
          <h1>Save Tweets for later</h1>
          <span style={{ textAlign: "center" }}>
            Don't let the good ones fly away! Bookmark Tweets to easily find
            them again in the future.
          </span>
        </div>
      )}
    </Container>
  );
};

export default Bookmarks;
