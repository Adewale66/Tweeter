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
import { useState } from "react";
import Body from "./components/Body";
import { Link } from "react-router-dom";
import Settings from "./components/Settings";

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

  function changeFollowers() {
    setType("followers");
    open();
  }
  function changeFollowing() {
    setType("following");
    open();
  }
  return (
    <>
      <Modal opened={opened} onClose={close} type={type} />
      <Image
        src="http://localhost:8000/uploads/tree-736885_1280.jpg"
        height={280}
      />
      <div className={classes.container}>
        <Avatar
          src="https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D&w=1000&q=80"
          alt="wale"
          radius="md"
          mr={24}
          className={classes.image}
        />
        <Stack maw={420} className={classes.stack}>
          <Flex wrap="wrap" align="center" className={classes.flexContainer}>
            <Text fz={24} fw={600} className={classes.username}>
              Adewale Kujore
            </Text>
            <Flex gap={26}>
              <Text
                fz={12}
                fw={600}
                className={classes.modal}
                onClick={changeFollowing}
              >
                2000 Following
              </Text>
              <Text
                fz={12}
                fw={600}
                className={classes.modal}
                onClick={changeFollowers}
              >
                3000 Followers
              </Text>
            </Flex>
          </Flex>
          <Text fw={500} fz={15} className={classes.text}>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit.sssssssss
          </Text>
        </Stack>
        {false && (
          <Button
            h={32}
            color="#2F80ED"
            leftIcon={<IconUserPlus size={18} />}
            size="md"
            className={classes.btn}
          >
            Follow
          </Button>
        )}
        {/* <Button h={32} variant="default" size="md" ml="auto">
          Following
        </Button> */}
        {"wale" && (
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
      <Body />
    </>
  );
};

export default Profile;
