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
      keepUnusedDataFor : 60 * 5,
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
    getFeedReels : builder.query<any,any>({
      query : ({page}) => ({
        url : `/post/get/feed/reels?page=${page}`,
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
    }),

    getMessages : builder.query<any,any>({
      query : (chatId) => ({
        url  :`/chat/get/message/${chatId}`,
        method : "GET",
        credentials : "include"
      })
    })
    ,
    sendFollowRequest : builder.mutation<any,any>({
      query : (userId) => ({
        url : "/users/follow",
        method : "PUT",
        credentials : "include",
        body : {userId}
      })
    }),
    sendUnfollowRequest : builder.mutation<any,any>({
      query : (userId) => ({
        url : "/users/unfollow",
        method : "PUT",
        credentials : "include",
        body : {userId},
      })
    }),
    getUserNotifs : builder.query<any,void>({
      query : () => ({
        url : "/users/get/user/notifs",
        method : 'GET',
        credentials : "include"
      })
    }),
    deleteNotification : builder.mutation<any,any>({
      query : (notifId) => ({
        url : "/users/del/notif",
        method : "DELETE",
        credentials : "include",
        body : {notifId}
      })
    }),
    sendFile : builder.mutation<any,any>({
      query : (data) => ({
        url : "/chat/new/attach",
        method : "POST",
        credentials : "include",
        body : data,
      })
    }),
    logout : builder.mutation<any,void>({
      query : () => ({
        url : "/users/logout",
        method : 'PUT',
        credentials : "include",

      })
    }),
    createPost : builder.mutation<any,any>({
      query : (data) => ({
        url : "/post/create",
        method : 'POST',
        body : data,
        credentials : "include"
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
  useGetChatDetailsQuery,
  useGetMessagesQuery,
  useSendFollowRequestMutation,
  useSendUnfollowRequestMutation,
  useGetUserNotifsQuery,
  useDeleteNotificationMutation,
  useSendFileMutation,
  useLogoutMutation,
  useCreatePostMutation
} = api;

export default api;
