import { Modal } from "@mantine/core";
import { AuthenticationForm } from "./Form";

function LoginModal({ opened, close }: { opened: boolean; close: () => void }) {
  return (
    <>
      <Modal opened={opened} onClose={close} radius="xl" centered size="lg">
        <AuthenticationForm />
      </Modal>
    </>
  );
}

export default LoginModal;
