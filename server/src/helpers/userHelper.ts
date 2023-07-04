import users from "../models/users";

const deleteUserHelper = async (username) => {
  await users.findOneAndRemove({ username });
};

const createUserHelper = async (username, password) => {
  const user = await users.create({
    name: "testing",
    username: username,
    password: password,
  });
  return user;
};

export { deleteUserHelper, createUserHelper };
