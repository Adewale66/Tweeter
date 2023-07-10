import {
  FollowProps,
  TweetProps,
  UserProps,
  UserToken,
} from "../../types/user";
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
    updateUser: builder.mutation<UserToken, FormData>({
      query: (body) => ({
        url: "user",
        method: "PUT",
        body: body,
      }),
      invalidatesTags: ["User"],
    }),
    getProfileData: builder.query<UserProps, { name: string }>({
      query: (body) => `user/${body.name}`,
      providesTags: ["User"],
    }),

    getHomeTweets: builder.query<TweetProps[], void>({
      query: () => "home",
      providesTags: ["Home"],
    }),
    getBookmarks: builder.query<TweetProps[], void>({
      query: () => "bookmarks",
      providesTags: ["Bookmarks"],
    }),
    followUser: builder.mutation<void, { id: string }>({
      query: (body) => ({
        url: `user/${body.id}/follow`,
        method: "POST",
      }),
      invalidatesTags: ["User", "LoggedUser"],
    }),
    unFollowUser: builder.mutation<void, { id: string }>({
      query: (body) => ({
        url: `user/${body.id}/unfollow`,
        method: "POST",
      }),
      invalidatesTags: ["User", "LoggedUser"],
    }),
    getLoggeduser: builder.query<
      {
        username: string;
        name: string;
        following: FollowProps[];
        tweets: TweetProps[];
        profileimage: string;
        bannerImage: string;
        description: string;
      },
      { id: string }
    >({
      query: (body) => `user/${body.id}`,
      providesTags: ["LoggedUser"],
    }),
    getAllUsers: builder.query<
      { name: string; username: string; profileimage: string }[],
      void
    >({
      query: () => "user",
    }),
  }),
});

export const {
  useRegisterUserMutation,
  useCheckTokenMutation,
  useUpdateUserMutation,
  useGetProfileDataQuery,
  useGetBookmarksQuery,
  useGetHomeTweetsQuery,
  useFollowUserMutation,
  useUnFollowUserMutation,
  useGetLoggeduserQuery,
  useGetAllUsersQuery,
} = userApiSlice;
