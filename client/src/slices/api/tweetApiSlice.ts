import { apiSlice } from "./apiSlice";

export const tweetApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    makeTweet: builder.mutation<{ message: string }, FormData>({
      query: (data) => ({
        url: "tweet",
        method: "POST",
        body: data,
        formData: true,
      }),
    }),
    getAllTweets: builder.query({
      query: () => "tweet",
    }),
  }),
});

export const { useMakeTweetMutation, useGetAllTweetsQuery } = tweetApi;
