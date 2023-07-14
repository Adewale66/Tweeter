import { Modal, Stack, Text } from "@mantine/core";
import UserCard from "../../Home/components/UserCard";

interface Props {
  username: string;
  profileimage: string;
  followed: boolean;
  id: string;
  name: string;
}

const ModalFollow = ({
  opened,
  onClose,
  type,
  followers,
  following,
  state,
}: {
  opened: boolean;
  onClose: () => void;
  type: string;
  following: Props[] | undefined;
  followers: Props[] | undefined;
  state: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <Modal
      opened={opened}
      onClose={onClose}
      withCloseButton={true}
      centered
      title={
        <Text fz={12} fw={600}>
          {type === "following" ? "Following" : "Followers"}
        </Text>
      }
    >
      <Stack>
        {type === "following" &&
          following?.map((f) => (
            <UserCard
              id={f.id}
              username={f.username}
              profileimage={f.profileimage}
              followed={f.followed}
              name={f.name}
              key={f.id}
              close={onClose}
              state={state}
            />
          ))}
        {type === "followers" &&
          followers?.map((f) => (
            <UserCard
              id={f.id}
              username={f.username}
              profileimage={f.profileimage}
              followed={f.followed}
              name={f.name}
              key={f.id}
              close={onClose}
              state={state}
            />
          ))}
      </Stack>
    </Modal>
  );
};

export default ModalFollow;
