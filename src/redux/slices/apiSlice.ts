import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:4000/api" }),
  endpoints: (builder) => ({
    fetchUser: builder.query<any, string>({
      query: (userId) => ({
        url: `/users/get/${userId}`,
        method: "GET",
        credentials: "include",
      }),
    }),
    getUserPosts: builder.query({
      query: (userId) => ({
        url: `/post/get/${userId}`,
        method: "GET",
        credentials: "include",
      }),
    }),
    getSavedPost: builder.query<any, void>({
      query: () => ({
        url: `/post/get/user/saved`,
        method: "GET",
        credentials: "include",
      }),
    }),
    getUserFeed: builder.query<any, void>({
      query: () => ({
        url: `/post/get/u/feed`,
        method: "GET",
        credentials: "include",
      }),
    }),
    getLikedPostIds: builder.query<any, void>({
      query: () => ({
        url: "/like/get/liked/postids",
        method: "GET",
        credentials: "include",
      }),
    }),
    getSavedPostIds: builder.query<any, void>({
      query: () => ({
        url: "/post/get/user/saved/ids",
        method: "GET",
        credentials: "include",
      }),
    }),
    getCommentsOnPost: builder.query<any, {postId : string}>({
      query: ({postId}) => ({
        url: `/comment/get/${postId}`,
        method: "GET",
        credentials: "include",
      }),
    }),
    getSinglePost: builder.query<any, {postId : string}>({
      query: ({postId}) => ({
        url: `/post/get/p/${postId}`,
        method: "GET",
        credentials: "include",
      }),
    }),
    likePost: builder.mutation<any, {postId : string}>({
      query: ({postId}) => ({
        url: "/like/new",
        method : 'POST',
        credentials : "include",
        body : {postId} 
      }),
    }),
    savePost : builder.mutation<any,{postId : string}>({
      query : ({postId}) => ({
        url : "/post/save",
        method : "POST",
        credentials : "include",
        body : {postId}
      })
    }),
    addComment : builder.mutation<any,{postId : string,comment : string,commentId ?:string,type : string}>({
      query : ({postId,comment,type,commentId}) => ({
        url : "/comment/new",
        method : "POST",
        credentials : "include",
        body : {postId,content : comment,commentId,type}
      })
    }),

  }),
});

export const {
  useFetchUserQuery,
  useGetUserPostsQuery,
  useGetSavedPostQuery,
  useGetUserFeedQuery,
  useGetLikedPostIdsQuery,
  useLikePostMutation,
  useSavePostMutation,
  useGetSavedPostIdsQuery,
  useAddCommentMutation,
  useGetCommentsOnPostQuery,
  useGetSinglePostQuery
} = api;

export default api;
