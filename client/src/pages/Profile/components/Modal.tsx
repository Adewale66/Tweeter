import { Modal, Stack, Text } from "@mantine/core";
import UserCard from "../../Home/components/whotofollow/UserCard";

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

  name,
}: {
  opened: boolean;
  onClose: () => void;
  type: string;
  following: Props[] | undefined;
  followers: Props[] | undefined;
  name: string;
}) => {
  return (
    <Modal
      opened={opened}
      onClose={onClose}
      withCloseButton={true}
      centered
      title={
        <Text fz={12} fw={600}>
          {name} {type === "following" ? "is" : ""} {type}
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
            />
          ))}
      </Stack>
    </Modal>
  );
};

export default ModalFollow;
