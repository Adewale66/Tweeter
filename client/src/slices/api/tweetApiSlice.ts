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
      invalidatesTags: ["Home"],
    }),
    getAllTweets: builder.query({
      query: () => "tweet",
    }),
    likeTweet: builder.mutation<void, { id: string }>({
      query: (data) => ({
        url: "tweet/" + data.id + "/like",
        method: "POST",
      }),
      invalidatesTags: ["User", "Home", "Bookmarks", "LoggedUser"],
    }),
    removeLike: builder.mutation<void, { id: string }>({
      query: (data) => ({
        url: "tweet/" + data.id + "/removeLike",
        method: "POST",
      }),
      invalidatesTags: ["User", "Home", "Bookmarks", "LoggedUser"],
    }),
    retweetTweet: builder.mutation<void, { id: string }>({
      query: (data) => ({
        url: "tweet/" + data.id + "/retweet",
        method: "POST",
      }),
      invalidatesTags: ["User", "Home", "Bookmarks", "LoggedUser"],
    }),
    removeRetweet: builder.mutation<void, { id: string }>({
      query: (data) => ({
        url: "tweet/" + data.id + "/removeRetweet",
        method: "POST",
      }),
      invalidatesTags: ["User", "Home", "Bookmarks", "LoggedUser"],
    }),
    saveTweet: builder.mutation<void, { id: string }>({
      query: (data) => ({
        url: "tweet/" + data.id + "/bookmark",
        method: "POST",
      }),
      invalidatesTags: ["User", "Home", "Bookmarks", "LoggedUser"],
    }),
    removeBookmark: builder.mutation<void, { id: string }>({
      query: (data) => ({
        url: "tweet/" + data.id + "/removeBookmark",
        method: "POST",
      }),
      invalidatesTags: ["User", "Home", "Bookmarks", "LoggedUser"],
    }),
    makeComment: builder.mutation<void, { id: string; comment: string }>({
      query: (data) => ({
        url: "tweet/" + data.id + "/comment",
        method: "POST",
        body: { comment: data.comment },
      }),
      invalidatesTags: ["User", "Home", "Bookmarks", "LoggedUser"],
    }),
  }),
});

export const {
  useMakeTweetMutation,
  useGetAllTweetsQuery,
  useLikeTweetMutation,
  useRemoveLikeMutation,
  useSaveTweetMutation,
  useRemoveBookmarkMutation,
  useRetweetTweetMutation,
  useRemoveRetweetMutation,
  useMakeCommentMutation,
} = tweetApi;
