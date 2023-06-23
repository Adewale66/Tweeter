import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface UserInfo {
  userInfo: {
    id: string;
    name: string;
    username: string;
  } | null;
}

interface User {
  id: string;
  name: string;
  username: string;
}

const initialState: UserInfo = {
  userInfo: localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo") as string)
    : null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<User>) => {
      state.userInfo = action.payload;
      localStorage.setItem("userInfo", JSON.stringify(action.payload));
    },
    removeCredentials: (state) => {
      state.userInfo = null;
      localStorage.removeItem("userInfo");
    },
  },
});

export const { setCredentials, removeCredentials } = authSlice.actions;
export default authSlice.reducer;
