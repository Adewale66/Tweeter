import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../../store";

const baseQuery = fetchBaseQuery({
  baseUrl: "/api/",
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.userInfo?.access_token;

    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
  },
});

export const apiSlice = createApi({
  baseQuery,
  tagTypes: ["User"],
  endpoints: () => ({}),
});
