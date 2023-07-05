import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { UserToken } from "../types/user";

interface UserInfo {
  userInfo: {
    id: string;
    name: string;
    username: string;
    access_token: string;
  } | null;
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
    setCredentials: (state, action: PayloadAction<UserToken>) => {
      state.userInfo = action.payload;
      localStorage.setItem("userInfo", JSON.stringify(action.payload));
    },
    removeCredentials: (state) => {
      state.userInfo = null;
      localStorage.removeItem("userInfo");
    },
    changeToken: (state, action: PayloadAction<{ message: string }>) => {
      if (state.userInfo) {
        state.userInfo.access_token = action.payload.message;
        localStorage.setItem("userInfo", JSON.stringify(state.userInfo));
      }
    },
  },
});

export const { setCredentials, removeCredentials, changeToken } =
  authSlice.actions;
export default authSlice.reducer;
