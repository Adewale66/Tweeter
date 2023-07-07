import Tweet from "../components/Tweet/Tweet";
import { Container } from "@mantine/core";
import { useGetBookmarksQuery } from "../slices/api/userApiSlice";

const Bookmarks = () => {
  const { data, isLoading } = useGetBookmarksQuery();
  if (isLoading) return <div>Loading...</div>;
  return (
    <Container mt={30}>
      {data &&
        data?.length > 0 &&
        data?.map((tweet) => <Tweet key={tweet.timeMade} tweet={tweet} />)}
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
