import {
  Avatar,
  Button,
  Flex,
  Image,
  Loader,
  Stack,
  Text,
} from "@mantine/core";
import { IconUserPlus } from "@tabler/icons-react";
import { useDisclosure, useDocumentTitle } from "@mantine/hooks";
import Modal from "./components/Modal";
import { useRef, useState } from "react";
import Body from "./components/Body";
import Settings from "./components/Settings";
import { useParams } from "react-router-dom";
import {
  useCheckTokenMutation,
  useFollowUserMutation,
  useGetLoggeduserQuery,
  useGetProfileDataQuery,
  useUnFollowUserMutation,
} from "../../slices/api/userApiSlice";
import { AppDispatch, RootState } from "../../store";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { changeToken, removeCredentials } from "../../slices/authSlice";
import { NotFoundUser } from "./components/NouserFound";
import useStylesProfile from "./profileStyles";

const Profile = () => {
  const { classes } = useStylesProfile();
  const [opened, { open, close }] = useDisclosure(false);
  const [ModalOpened, { open: openModal, close: closeModal }] =
    useDisclosure(false);
  const [type, setType] = useState<string>("");
  const { profile } = useParams();
  const { data, isLoading, isFetching } = useGetProfileDataQuery({
    name: profile as string,
  });
  const [follow] = useFollowUserMutation();
  const [unFollow] = useUnFollowUserMutation();

  const followBtn = useRef<HTMLButtonElement>(null);
  const unfollowBtn = useRef<HTMLButtonElement>(null);

  const dispatch: AppDispatch = useDispatch();
  const [token] = useCheckTokenMutation();
  const [newPage, setNewpage] = useState(true);

  const user = useSelector((state: RootState) => state.auth.userInfo);
  const { data: loggeduser, isFetching: isFetchingLoggeduser } =
    useGetLoggeduserQuery({
      id: user?.username as string,
    });
  const checker = data?.username === user?.username ? true : false;
  useDocumentTitle(`${profile}/ Tweeter`);

  const presentFollwing = loggeduser?.following.find(
    (f) => f.username === data?.username
  );

  if (isLoading && isFetching)
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
  if (isFetching && !isFetchingLoggeduser && newPage)
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
  if (!data) return <NotFoundUser />;

  function changeFollowers() {
    setType("followers");
    open();
  }
  function changeFollowing() {
    setType("following");
    open();
  }

  const followers = data.followers.map((p) => {
    return {
      username: p.username,
      profileimage: p.profileimage,
      followed: loggeduser?.following.find((f) => f.username === p.username)
        ? true
        : false,
      id: p.id,
      name: p.name,
    };
  });

  const following = data.following.map((p) => {
    return {
      username: p.username,
      profileimage: p.profileimage,
      followed: loggeduser?.following.find((f) => f.username === p.username)
        ? true
        : false,
      id: p.id,
      name: p.name,
    };
  });

  const ids = loggeduser?.tweets.map((t) => {
    return {
      id: t.tweet._id,
      retweeted: t.retweeted,
      liked: t.liked,
      saved: t.saved,
    };
  });

  async function handleFollow() {
    setNewpage(false);
    try {
      await follow({ id: data?.id as string }).unwrap();

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error.data.error === "token expired") {
        try {
          if (user) {
            const res = await token({
              username: user?.username,
              id: user?.id,
            }).unwrap();
            dispatch(changeToken(res));
            followBtn.current?.click();
          }
        } catch (error) {
          toast.error("Session expired, please log in");
          dispatch(removeCredentials());
        }
      } else if (error.status === "PARSING_ERROR") {
        toast.error(error.data);
      } else toast.error("Something went wrong");
    }
  }

  async function handleUnfollow() {
    setNewpage(false);
    try {
      await unFollow({ id: data?.id as string }).unwrap();

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error.data.error === "token expired") {
        try {
          if (user) {
            const res = await token({
              username: user?.username,
              id: user?.id,
            }).unwrap();
            dispatch(changeToken(res));
            unfollowBtn.current?.click();
          }
        } catch (error) {
          toast.error("Session expired, please log in");
          dispatch(removeCredentials());
        }
      } else if (error.status === "PARSING_ERROR") {
        toast.error(error.data);
      } else toast.error("Something went wrong");
    }
  }

  return (
    <>
      <Modal
        state={setNewpage}
        opened={opened}
        onClose={close}
        type={type}
        following={following}
        followers={followers}
        name={data?.name}
      />
      <Image withPlaceholder src={data?.bannerImage} height={280} />
      <div className={classes.container}>
        <Avatar
          src={data?.profileimage}
          alt="wale"
          radius="md"
          mr={24}
          className={classes.image}
        />
        <Stack maw={420} className={classes.stack} mih={100}>
          <Flex wrap="wrap" align="center" className={classes.flexContainer}>
            <Text fz={24} fw={600} className={classes.username}>
              {data?.name}
            </Text>
            <Flex gap={26}>
              <Text
                fz={12}
                fw={600}
                className={classes.modal}
                onClick={changeFollowing}
              >
                {data?.following.length} Following
              </Text>
              <Text
                fz={12}
                fw={600}
                className={classes.modal}
                onClick={changeFollowers}
              >
                {data?.followers.length} Followers
              </Text>
            </Flex>
          </Flex>
          <Text fw={500} fz={15} className={classes.text}>
            {data?.description}
          </Text>
        </Stack>
        {user?.username === data?.username && (
          <Button
            variant="default"
            size="md"
            radius="md"
            className={classes.btn}
            ml="auto"
            onClick={openModal}
          >
            Edit Profile
          </Button>
        )}
        {isFetchingLoggeduser && isFetching && !checker ? (
          <Button
            h={40}
            size="md"
            className={classes.btn}
            style={{ backgroundColor: "transparent" }}
            disabled
            variant="default"
          >
            <Loader />
          </Button>
        ) : (
          <>
            {!presentFollwing && loggeduser?.username !== data?.username && (
              <Button
                h={40}
                color="#2F80ED"
                leftIcon={<IconUserPlus size={18} />}
                size="md"
                className={classes.btn}
                onClick={handleFollow}
                ref={followBtn}
              >
                Follow
              </Button>
            )}
            {presentFollwing && (
              <Button
                h={40}
                variant="default"
                size="md"
                ml="auto"
                className={classes.btn}
                onClick={handleUnfollow}
                ref={unfollowBtn}
              >
                Following
              </Button>
            )}
          </>
        )}
        <Settings opened={ModalOpened} close={closeModal} />
      </div>
      {data?.tweets && <Body tweets={data.tweets} ids={ids ? ids : []} />}
    </>
  );
};

export default Profile;
