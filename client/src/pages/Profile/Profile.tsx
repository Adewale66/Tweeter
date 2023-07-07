import {
  Avatar,
  Button,
  Flex,
  Image,
  Stack,
  Text,
  createStyles,
} from "@mantine/core";
import { IconUserPlus } from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";
import Modal from "./components/Modal";
import { useEffect, useRef, useState } from "react";
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
import { FollowProps } from "../../types/user";
import toast from "react-hot-toast";
import { changeToken, removeCredentials } from "../../slices/authSlice";

const useStyles = createStyles((theme) => ({
  image: {
    [theme.fn.smallerThan("sm")]: {
      width: "7.25rem",
      height: "7.25rem",
      margin: 0,
    },
    width: "9.25rem",
    height: "9.25rem",
    margin: "0 1.625rem 0 0",
    position: "absolute",
    top: "-3rem",
  },
  container: {
    margin: "0 auto",
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[6]
        : theme.colors.gray[0],
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
    display: "flex",
    position: "relative",
    top: "-3rem",
    width: "60%",
    flexWrap: "wrap",
    borderRadius: "0.75rem",
    padding: "0.8rem",
    [theme.fn.smallerThan("md")]: {
      justifyContent: "center",
      gap: "0.8rem",
      alignItems: "center",
      width: "90%",
    },
  },
  btn: {
    marginLeft: "auto",
    [theme.fn.smallerThan("md")]: {
      marginLeft: "0",
    },
  },
  flexContainer: {
    [theme.fn.smallerThan("md")]: {
      gap: "0.25rem",
      justifyContent: "center",
    },
  },
  text: {
    [theme.fn.smallerThan("md")]: {
      textAlign: "center",
    },
  },
  username: {
    marginRight: "1.625rem",
    [theme.fn.smallerThan("md")]: {
      marginRight: "0",
    },
    [theme.fn.smallerThan("xl")]: {
      marginRight: "1.625rem",
    },
  },
  stack: {
    marginLeft: "10.5rem",

    [theme.fn.smallerThan("md")]: {
      marginTop: "5.5rem",
      marginLeft: "0",
    },
    [theme.fn.smallerThan("sm")]: {
      marginTop: "3.5rem",
      marginLeft: "0",
    },
  },

  modal: {
    ...theme.fn.hover({
      cursor: "pointer",
    }),
  },
}));
const Profile = () => {
  const { classes } = useStyles();
  const [opened, { open, close }] = useDisclosure(false);
  const [ModalOpened, { open: openModal, close: closeModal }] =
    useDisclosure(false);
  const [type, setType] = useState<string>("");
  const { profile } = useParams();
  const { data, isLoading } = useGetProfileDataQuery({
    name: profile as string,
  });
  const [follow] = useFollowUserMutation();
  const [unFollow] = useUnFollowUserMutation();

  const followBtn = useRef<HTMLButtonElement>(null);
  const unfollowBtn = useRef<HTMLButtonElement>(null);

  const dispatch: AppDispatch = useDispatch();
  const [token] = useCheckTokenMutation();

  const user = useSelector((state: RootState) => state.auth.userInfo);
  const { data: loggeduser } = useGetLoggeduserQuery({
    id: user?.id as string,
  });

  const presentFollwing = loggeduser?.following.find(
    (f) => f.username === data?.username
  );

  if (isLoading) return <h1>Loading....</h1>;

  if (!data) return <h1>No User found</h1>;

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
    };
  });

  async function handleFollow() {
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
        opened={opened}
        onClose={close}
        type={type}
        following={following}
        followers={followers}
        username={data?.username}
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
              {data?.username}
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
            onClick={handleUnfollow}
            ref={unfollowBtn}
          >
            Following
          </Button>
        )}
        {loggeduser?.username === data?.username && (
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
        <Settings opened={ModalOpened} close={closeModal} />
      </div>
      {data?.tweets && <Body tweets={data.tweets} />}
    </>
  );
};

export default Profile;
