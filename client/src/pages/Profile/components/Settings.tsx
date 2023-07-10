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
import { useEffect, useRef, useState } from "react";
import { IconCameraPlus } from "@tabler/icons-react";
import {
  useCheckTokenMutation,
  useGetLoggeduserQuery,
  useUpdateUserMutation,
} from "../../../slices/api/userApiSlice";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store";
import {
  changeToken,
  removeCredentials,
  setCredentials,
} from "../../../slices/authSlice";

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
  const [updateUser] = useUpdateUserMutation();
  const [token] = useCheckTokenMutation();
  const user = useSelector((state: RootState) => state.auth.userInfo);
  const btnRef = useRef<HTMLButtonElement>(null);
  const { data: loggeduser } = useGetLoggeduserQuery({
    id: user?.username as string,
  });
  const [valueProfile, setValueProfile] = useState<File | null>(null);
  const [valueBanner, setValueBanner] = useState<File | null>(null);

  const [description, setDescription] = useState("");
  const [name, setName] = useState("");

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
  useEffect(() => {
    setDescription(loggeduser?.description as string);
    setName(loggeduser?.name as string);
  }, [loggeduser]);

  async function saveChanges() {
    const form = new FormData();
    form.append("name", name);
    form.append("description", description);
    form.append("banner", valueBanner as Blob);
    form.append("profile", valueProfile as Blob);

    try {
      const res = await updateUser(form).unwrap();
      dispatch(setCredentials(res));
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
      onClose={() => {
        setValueProfile(null);
        setValueBanner(null);
        setDescription(loggeduser?.description as string);
        setName(loggeduser?.name as string);
        close();
      }}
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
            valueBanner
              ? URL.createObjectURL(valueBanner)
              : loggeduser?.bannerImage
          }
          height={120}
          fit="cover"
          withPlaceholder
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
            valueProfile
              ? URL.createObjectURL(valueProfile)
              : loggeduser?.profileimage
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
        <Input.Wrapper id="input-demo" label="Name" mt={50}>
          <Input
            id="input-demo"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
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
