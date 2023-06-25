import { apiSlice } from "./apiSlice";

export const tweetApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    makeTweet: builder.mutation<
      { message: string },
      { tweet: string; preference: string; image: string }
    >({
      query: (data) => ({
        url: "tweet",
        method: "POST",
        body: data,
      }),
    }),
    getAllTweets: builder.query({
      query: () => "tweet",
    }),
  }),
});

export const { useMakeTweetMutation, useGetAllTweetsQuery } = tweetApi;
