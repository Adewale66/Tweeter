import users from "../models/users";

const deleteUserHelper = async () => {
  await users.findOneAndRemove({ username: "newuser" });
};

export { deleteUserHelper };
