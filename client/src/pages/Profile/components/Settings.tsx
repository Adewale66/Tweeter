import {
  Avatar,
  Button,
  Image,
  Input,
  Modal,
  Stack,
  Text,
  Textarea,
  FileInput,
  createStyles,
  CloseButton,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { useRef, useState } from "react";
import { IconCameraPlus } from "@tabler/icons-react";
import {
  useCheckTokenMutation,
  useUpdateUserMutation,
} from "../../../slices/api/userApiSlice";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store";
import { changeToken, removeCredentials } from "../../../slices/authSlice";

const useStyles = createStyles((theme) => ({
  icon: {
    ...theme.fn.hover({
      cursor: "pointer",
    }),
  },
}));

const Settings = ({
  opened,
  close,
}: {
  opened: boolean;
  close: () => void;
}) => {
  const isMobile = useMediaQuery("(max-width: 50em)");
  const profileRef = useRef<HTMLButtonElement>(null);
  const bannerRef = useRef<HTMLButtonElement>(null);
  const { classes } = useStyles();
  const [valueProfile, setValueProfile] = useState<File | null>(null);
  const [valueBanner, setValueBanner] = useState<File | null>(null);

  const [description, setDescription] = useState("");
  const [username, setUsername] = useState("");
  const [updateUser] = useUpdateUserMutation();
  const [token] = useCheckTokenMutation();
  const user = useSelector((state: RootState) => state.auth.userInfo);
  const btnRef = useRef<HTMLButtonElement>(null);

  const dispatch: AppDispatch = useDispatch();

  function changeBanner() {
    if (bannerRef.current) {
      bannerRef.current.click();
    }
  }

  function changeProfile() {
    if (profileRef.current) {
      profileRef.current.click();
    }
  }

  async function saveChanges() {
    const form = new FormData();
    form.append("username", username);
    form.append("description", description);
    form.append("banner", valueBanner as Blob);
    form.append("profile", valueProfile as Blob);

    try {
      await updateUser(form).unwrap();
      toast.success("Changes saved successfully");
      close();
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
            btnRef.current?.click();
          }
        } catch (error) {
          toast.error("Session expired, please log in");
          dispatch(removeCredentials());
        }
      } else if (error.status === "PARSING_ERROR") {
        toast.error(error.data);
      } else if (error.data.message) toast.error(error.data.message);
      else toast.error("Something went wrong");
    }
  }

  return (
    <Modal
      opened={opened}
      onClose={close}
      title={
        <Text fz={12} fw={600}>
          {" "}
          Edit Profile
        </Text>
      }
      fullScreen={isMobile}
      centered
      transitionProps={{ transition: "fade", duration: 200 }}
    >
      <Stack pos="relative">
        <FileInput
          ref={profileRef}
          style={{ display: "none" }}
          onChange={setValueProfile}
          value={valueProfile}
        />
        <FileInput
          ref={bannerRef}
          style={{ display: "none" }}
          onChange={setValueBanner}
          value={valueBanner}
        />
        <Image
          src={
            (valueBanner && URL.createObjectURL(valueBanner)) ||
            "https://e0.pxfuel.com/wallpapers/364/85/desktop-wallpaper-gray-high-quality.jpg"
          }
          height={120}
          fit="cover"
        />
        {valueBanner && (
          <CloseButton
            pos="absolute"
            right="40%"
            top={50}
            onClick={() => setValueBanner(null)}
          />
        )}

        <IconCameraPlus
          style={{ position: "absolute", right: "50%", top: "50" }}
          className={classes.icon}
          color="white"
          onClick={changeBanner}
        />
        <Avatar
          src={
            (valueProfile && URL.createObjectURL(valueProfile)) ||
            "https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D&w=1000&q=80"
          }
          alt="wale"
          radius="50%"
          pos="absolute"
          size="xl"
          top={90}
          left={0}
        />
        <IconCameraPlus
          style={{ position: "absolute", left: "7%", top: "120" }}
          className={classes.icon}
          onClick={changeProfile}
          color="white"
        />
        <Input.Wrapper id="input-demo" label="Username" mt={50}>
          <Input
            id="input-demo"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Input.Wrapper>
        <Textarea
          placeholder="Bio"
          label="Bio"
          radius="md"
          maxLength={120}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <Button ref={btnRef} onClick={saveChanges}>
          Save
        </Button>
      </Stack>
    </Modal>
  );
};

export default Settings;
