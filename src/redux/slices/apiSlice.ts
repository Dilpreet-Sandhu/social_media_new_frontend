import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:4000/api" }),
  tagTypes : ["post"],
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
      providesTags : ["post"]
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
    getExploreFeed : builder.query<any,void>({
      query : () => ({
        url : "/post/get/explore/feed",
        method : "GET",
        credentials : "include"
      })
    }),
    getFeedReels : builder.query<any,void>({
      query : () => ({
        url : `/post/get/feed/reels`,
        method : "GET",
        credentials : "include",
      })
    }),

    getUserChats : builder.query<any,void>({
      query : () => ({
        url : "/chat/c/get",
        method : 'GET',
        credentials : "include"
      })
    }),
    createChat : builder.mutation<any,any>({
      query : (otherUserId) => ({
        url : "/chat/ng/create",
        method : 'POST',
        body : {otherUserId},
        credentials : "include",
      })
    })
,
    getChatDetails : builder.query<any,any>({
      query : (chatId) => ({
        url : `/chat/get/${chatId}`,
        method : "GET",
        credentials : "include",
      })
    })
    

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
  useGetSinglePostQuery,
  useGetExploreFeedQuery,
  useGetFeedReelsQuery,
  useGetUserChatsQuery,
  useCreateChatMutation,
  useGetChatDetailsQuery
} = api;

export default api;
