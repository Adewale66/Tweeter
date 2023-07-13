import { useSelector } from "react-redux";
import Tweet from "../../components/Tweet/Tweet";
import {
  useGetAllUsersQuery,
  useGetHomeTweetsQuery,
  useGetLoggeduserQuery,
} from "../../slices/api/userApiSlice";
import { RootState } from "../../store";

import MakeTweet from "./components/makeTweet/MakeTweet";
import Trends from "./components/Trends";
import {
  Autocomplete,
  Loader,
  SelectItemProps,
  createStyles,
  Group,
  Avatar,
  Text,
  MantineColor,
  AutocompleteItem,
  Container,
} from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import { forwardRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDocumentTitle } from "@mantine/hooks";

const useStyles = createStyles((theme) => ({
  container: {
    position: "absolute",
    top: "1.25rem",
    right: "4.375rem",
    [theme.fn.smallerThan("lg")]: {
      position: "static",
    },
  },
}));

interface ItemProps extends SelectItemProps {
  color: MantineColor;
  name: string;
  profileimage: string;
}

const AutoCompleteItem = forwardRef<HTMLDivElement, ItemProps>(
  ({ profileimage, name, ...others }: ItemProps, ref) => (
    <div ref={ref} {...others}>
      <Group noWrap>
        <Avatar src={profileimage} />
        <div>
          <Text>{name}</Text>
        </div>
      </Group>
    </div>
  )
);

const Home = () => {
  const { classes, theme } = useStyles();
  const [value, setValue] = useState("");
  const { data, isLoading } = useGetHomeTweetsQuery();
  const { data: allUsers } = useGetAllUsersQuery();
  const user = useSelector((state: RootState) => state.auth.userInfo);
  const navigate = useNavigate();
  useDocumentTitle("Home/ Tweeter");

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

  let result:
    | { value: string; name: string; username: string; profileimage: string }[]
    | readonly (string | AutocompleteItem)[] = [];
  if (allUsers) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    result = allUsers!
      .map((t) => ({ ...t, value: t.username }))
      .filter((t) => t.username !== loggeduser?.username);
  }

  function searchUser() {
    if (value) {
      navigate(`/${value}`);
    }
  }

  return (
    <div style={{ position: "relative", padding: "1.25rem 0.625rem" }}>
      <div className={classes.container}>
        <Container size={theme.breakpoints.xs}>
          <Autocomplete
            value={value}
            onChange={setValue}
            icon={<IconSearch />}
            placeholder="Search Tweeter"
            data={result}
            itemComponent={AutoCompleteItem}
            mb={28}
            radius="md"
            onItemSubmit={searchUser}
            limit={5}
          />
        </Container>
        <Trends />
      </div>
      <Container size={theme.breakpoints.xs}>
        <MakeTweet />
        {isLoading && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Loader />
          </div>
        )}

        {!isLoading &&
          data?.map((t) => (
            <Tweet key={t.tweet._id} tweet={t} ids={ids ? ids : []} />
          ))}
      </Container>
    </div>
  );
};

export default Home;
