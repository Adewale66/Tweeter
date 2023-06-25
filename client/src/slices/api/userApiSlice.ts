import { apiSlice } from "./apiSlice";

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    registerUser: builder.mutation<
      { message: string },
      { username: string; password: string; name: string }
    >({
      query: (body) => ({
        url: "user",
        method: "POST",
        body: body,
      }),
    }),
    checkToken: builder.query<{ message: string }, void>({
      query: () => "checkToken",
    }),
  }),
});

export const { useRegisterUserMutation, useCheckTokenQuery } = userApiSlice;
