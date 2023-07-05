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
    checkToken: builder.mutation<
      { message: string },
      { username: string; id: string }
    >({
      query: (body) => ({
        url: "checkToken",
        method: "POST",
        body: body,
      }),
    }),
    updateUser: builder.mutation<void, FormData>({
      query: (body) => ({
        url: "user",
        method: "PUT",
        body: body,
      }),
    }),
  }),
});

export const {
  useRegisterUserMutation,
  useCheckTokenMutation,
  useUpdateUserMutation,
} = userApiSlice;
