import {
  Avatar,
  Button,
  Container,
  Divider,
  Flex,
  Stack,
  Text,
  Textarea,
  Popover,
  CloseButton,
  FileInput,
  Image,
} from "@mantine/core";
import { IconPhoto, IconWorld, IconUsers } from "@tabler/icons-react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../store";
import { useState, useRef } from "react";
import { useMakeTweetMutation } from "../../../../slices/api/tweetApiSlice";
import { toast } from "react-hot-toast";
import { changeToken, removeCredentials } from "../../../../slices/authSlice";
import { useCheckTokenMutation } from "../../../../slices/api/userApiSlice";
import useStylesMakeTweet from "./makeTweetStyles";

const MakeTweet = () => {
  const { classes, theme } = useStylesMakeTweet();
  const user = useSelector((state: RootState) => state.auth.userInfo);
  const [whoCanReply, setWhoCanReply] = useState<
    "Everyone" | "People you follow"
  >("Everyone");
  const [tweet, setTweet] = useState<string>("");
  const [makeTweet] = useMakeTweetMutation();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileRef = useRef<HTMLButtonElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);

  const dispatch: AppDispatch = useDispatch();
  const [token] = useCheckTokenMutation();

  async function handleSubmit() {
    const formData = new FormData();
    formData.append("tweet", tweet);
    formData.append("preference", whoCanReply);

    if (selectedFile) {
      formData.append("file", selectedFile as Blob);
    }
    try {
      await makeTweet(formData).unwrap();
      toast.success("Success");
      setTweet("");
      setSelectedFile(null);
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
      } else toast.error("Something went wrong");
    }
  }

  const fileUpload = () => {
    if (fileRef.current) fileRef.current.click();
  };

  const removeImage = () => {
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
            alt="wale"
            radius="md"
            className={classes.hiddenMobile}
            src={user?.image}
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
            {selectedFile && (
              <div
                style={{
                  overflow: "hidden",
                  maxHeight: "17.5rem",
                  position: "relative",
                }}
              >
                <Image src={URL.createObjectURL(selectedFile)} alt="Preview" />
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
              <FileInput
                style={{ display: "none" }}
                ref={fileRef}
                onChange={setSelectedFile}
                value={selectedFile}
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
              <Button
                className={classes.btn}
                onClick={handleSubmit}
                ref={btnRef}
              >
                Tweet
              </Button>
            </Flex>
          </Stack>
        </Flex>
        <Flex gap={9} align="center" className={classes.hiddenDesktop}>
          <FileInput
            style={{ display: "none" }}
            ref={fileRef}
            onChange={setSelectedFile}
            value={selectedFile}
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
