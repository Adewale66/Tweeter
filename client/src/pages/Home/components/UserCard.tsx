import { Avatar, Button, Divider, Flex, Stack, Text } from "@mantine/core";

import { IconUserPlus } from "@tabler/icons-react";
import { useRef } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  useFollowUserMutation,
  useUnFollowUserMutation,
  useCheckTokenMutation,
} from "../../../slices/api/userApiSlice";
import { changeToken, removeCredentials } from "../../../slices/authSlice";
import { AppDispatch, RootState } from "../../../store";

function UserCard({
  username,
  profileimage,
  followed,
  id,
  name,
  close,
  state,
}: {
  username: string;
  profileimage: string;
  followed: boolean;
  id: string;
  name: string;
  close: () => void;
  state: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [follow] = useFollowUserMutation();
  const [unFollow] = useUnFollowUserMutation();

  const followBtn = useRef<HTMLButtonElement>(null);
  const unfollowBtn = useRef<HTMLButtonElement>(null);

  const dispatch: AppDispatch = useDispatch();
  const [token] = useCheckTokenMutation();
  const navigate = useNavigate();

  const user = useSelector((state: RootState) => state.auth.userInfo);

  async function handleFollow() {
    try {
      await follow({ id: id }).unwrap();

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
      await unFollow({ id: id }).unwrap();

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
    <Stack>
      <Flex gap={15} align="center">
        <Avatar src={profileimage} alt="wale" radius="md" />
        <Stack spacing={1}>
          <Text
            style={{ cursor: "pointer" }}
            fz={16}
            fw={500}
            onClick={() => {
              state(true);
              close();
              navigate(`/${username}`);
            }}
          >
            {name}
          </Text>
        </Stack>
        {!followed && user?.name !== name && (
          <Button
            h={32}
            color="#2F80ED"
            leftIcon={<IconUserPlus size={18} />}
            size="xs"
            ml="auto"
            ref={followBtn}
            onClick={handleFollow}
          >
            Follow
          </Button>
        )}
        {followed && user?.name !== name && (
          <Button
            h={32}
            variant="default"
            size="xs"
            ml="auto"
            ref={unfollowBtn}
            onClick={handleUnfollow}
          >
            Following
          </Button>
        )}
      </Flex>
      <Divider />
    </Stack>
  );
}

export default UserCard;
