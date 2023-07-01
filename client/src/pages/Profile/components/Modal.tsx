import { Divider, Modal, Stack, Text } from "@mantine/core";
import UserCard from "../../Home/components/whotofollow/users";

const ModalFollow = ({
  opened,
  onClose,
  type,
}: {
  opened: boolean;
  onClose: () => void;
  type: string;
}) => {
  return (
    <Modal
      opened={opened}
      onClose={onClose}
      withCloseButton={true}
      centered
      title={
        <Text fz={12} fw={600}>
          person {type === "following" ? "is" : ""} {type}
        </Text>
      }
    >
      <Stack>
        <UserCard />
        <Divider />
        <UserCard />
      </Stack>
    </Modal>
  );
};

export default ModalFollow;
