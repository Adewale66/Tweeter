import { apiSlice } from "./apiSlice";
import { UserToken } from "../../types/user";

interface Credentials {
  username: string;
  password: string;
}

export const logApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<UserToken, Credentials>({
      query: (credentials) => ({
        url: "login",
        method: "POST",
        body: credentials,
      }),
    }),
    logout: builder.mutation<{ message: string }, void>({
      query: () => ({
        url: "logout",
        method: "POST",
      }),
    }),
  }),
});

export const { useLoginMutation, useLogoutMutation } = logApiSlice;
