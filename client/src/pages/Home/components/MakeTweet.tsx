import {
  Avatar,
  Button,
  Container,
  Divider,
  Flex,
  Stack,
  Text,
  Textarea,
  createStyles,
  Popover,
  CloseButton,
  Image,
} from "@mantine/core";
import { IconPhoto, IconWorld, IconUsers } from "@tabler/icons-react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store";
import { ChangeEvent, useState } from "react";
import { useMakeTweetMutation } from "../../../slices/api/tweetApiSlice";
import { toast } from "react-hot-toast";
import { removeCredentials } from "../../../slices/authSlice";

const useStyles = createStyles((theme) => ({
  container: {
    borderRadius: "0.5rem",
    color: theme.colorScheme === "dark" ? theme.white : theme.black,

    marginBottom: "2rem",
    padding: "0",
  },
  textArea: {
    flexGrow: 1,
    background: "transparent",
  },
  input: {
    background: "transparent",
  },
  flexContainer: {
    borderRadius: "0.5rem",
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.white,
  },
  btn: {
    margin: "0 0 0 auto",
    backgroundColor: "#2F80ED",
  },
  text: {
    ...theme.fn.hover({
      cursor: "pointer",
    }),
    color: "#2F80ED",
  },

  hiddenDesktop: {
    [theme.fn.largerThan("sm")]: {
      display: "none",
    },
  },
  hiddenMobile: {
    [theme.fn.smallerThan("sm")]: {
      display: "none",
    },
  },
  set: {
    ...theme.fn.hover({
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[5]
          : theme.colors.gray[1],
      cursor: "pointer",
      borderRadius: "0.5rem",
    }),
    padding: "0.5rem",
  },
  imgae: {
    ...theme.fn.hover({
      cursor: "pointer",
    }),
  },
}));

const MakeTweet = () => {
  const { classes, theme } = useStyles();
  const user = useSelector((state: RootState) => state.auth.userInfo);
  const [whoCanReply, setWhoCanReply] = useState<
    "Everyone" | "People you follow"
  >("Everyone");
  const [tweet, setTweet] = useState<string>("");
  const [makeTweet] = useMakeTweetMutation();
  const [selectedFile, setSelectedFile] = useState<Blob | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const dispatch: AppDispatch = useDispatch();

  async function handleSubmit() {
    const formData = new FormData();
    formData.append("tweet", tweet);
    formData.append("preference", whoCanReply);

    if (selectedFile) {
      formData.append("file", selectedFile);
    }
    try {
      await makeTweet(formData).unwrap();
      toast.success("Tweeted Successfully");
      setTweet("");
      setSelectedFile(null);
      setPreviewImage(null);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error.status === 401) {
        dispatch(removeCredentials());
        toast.error("Session expired, please login again");
      } else toast.error("Something went wrong");
    }
  }

  const fileUpload = () => {
    document.getElementById("fileInput")?.click();
  };

  const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    setSelectedFile(file as Blob);

    const reader = new FileReader();
    reader.onload = () => {
      setPreviewImage(reader.result as string);
    };
    reader.readAsDataURL(file as Blob);
  };

  const removeImage = () => {
    setPreviewImage(null);
    setSelectedFile(null);
  };

  return (
    <Container
      size="xs"
      className={classes.container}
      hidden={user ? false : true}
    >
      <Flex
        direction="column"
        gap="sm"
        p={12}
        className={classes.flexContainer}
      >
        <Text size="xs" fz={12} fw={600}>
          Tweet Something
        </Text>
        <Divider color={theme.colorScheme === "dark" ? "gray.7" : "gray.3"} />
        <Flex gap={8}>
          <Avatar
            src="https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D&w=Z1000&q=80"
            alt="wale"
            radius="md"
            className={classes.hiddenMobile}
          />
          <Stack className={classes.textArea} spacing="xs">
            <Textarea
              placeholder="What's happening?"
              variant="unstyled"
              className={classes.input}
              maxLength={100}
              value={tweet}
              onChange={(e) => setTweet(e.target.value)}
            />
            {previewImage && (
              <div
                style={{
                  overflow: "hidden",
                  maxHeight: "17.5rem",
                  position: "relative",
                }}
              >
                <Image src={previewImage} alt="Preview" />
                <div
                  style={{
                    position: "absolute",
                    top: "0.5rem",
                    right: "0.5rem",
                  }}
                >
                  <CloseButton size="md" onClick={removeImage} />
                </div>
              </div>
            )}
            <Flex gap={9} align="center" className={classes.hiddenMobile}>
              <input
                type="file"
                name="imageFile"
                id="fileInput"
                style={{ display: "none" }}
                onChange={handleFileUpload}
              />
              <IconPhoto
                size={20}
                color="#2F80ED"
                className={classes.imgae}
                onClick={fileUpload}
              />

              <IconWorld size={20} color="#2F80ED" />
              <Popover position="bottom-start" width={234} radius={12}>
                <Popover.Target>
                  <Text size="xs" fz={12} fw={500} className={classes.text}>
                    {whoCanReply} can reply
                  </Text>
                </Popover.Target>
                <Popover.Dropdown>
                  <Text fz={12} fw={600}>
                    Who can reply?
                  </Text>
                  <Text fz={12}>Choose who can reply this Tweet.</Text>
                  <Flex
                    align="center"
                    gap={6}
                    mt={15}
                    className={classes.set}
                    onClick={() => setWhoCanReply("Everyone")}
                  >
                    <IconWorld size={20} />
                    <Text fz={12} fw={500}>
                      Everyone
                    </Text>
                  </Flex>
                  <Flex
                    align="center"
                    gap={6}
                    mt={9}
                    className={classes.set}
                    onClick={() => setWhoCanReply("People you follow")}
                  >
                    <IconUsers size={20} />
                    <Text fz={12} fw={500}>
                      People you follow
                    </Text>
                  </Flex>
                </Popover.Dropdown>
              </Popover>
              <Button className={classes.btn} onClick={handleSubmit}>
                Tweet
              </Button>
            </Flex>
          </Stack>
        </Flex>
        <Flex gap={9} align="center" className={classes.hiddenDesktop}>
          <input
            type="file"
            id="fileInput"
            style={{ display: "none" }}
            name="imageFile"
            onChange={handleFileUpload}
          />
          <IconPhoto
            size={20}
            color="#2F80ED"
            className={classes.imgae}
            onClick={fileUpload}
          />
          <IconWorld size={20} color="#2F80ED" />
          <Popover position="bottom-start" width={234} radius={12}>
            <Popover.Target>
              <Text size="xs" fz={12} fw={500} className={classes.text}>
                {whoCanReply} can reply
              </Text>
            </Popover.Target>
            <Popover.Dropdown>
              <Text fz={12} fw={600}>
                Who can reply?
              </Text>
              <Text fz={12}>Choose who can reply this Tweet.</Text>
              <Flex
                align="center"
                gap={6}
                mt={15}
                className={classes.set}
                onClick={() => setWhoCanReply("Everyone")}
              >
                <IconWorld size={20} />
                <Text fz={12} fw={500}>
                  Everyone
                </Text>
              </Flex>
              <Flex
                align="center"
                gap={6}
                mt={9}
                className={classes.set}
                onClick={() => setWhoCanReply("People you follow")}
              >
                <IconUsers size={20} />
                <Text fz={12} fw={500}>
                  People you follow
                </Text>
              </Flex>
            </Popover.Dropdown>
          </Popover>
          <Button className={classes.btn} onClick={handleSubmit}>
            Tweet
          </Button>
        </Flex>
      </Flex>
    </Container>
  );
};

export default MakeTweet;
