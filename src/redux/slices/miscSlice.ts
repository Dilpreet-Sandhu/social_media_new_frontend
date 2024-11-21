import { createSlice } from "@reduxjs/toolkit";

interface initial {
  smallSidebar: boolean;
  createChat: boolean;
  messageDialog : boolean;
  notificationDialog : boolean;
  searchDialog : boolean;
  isReelCommentsOpen : boolean;
  sidebarItem : "_" | "search" | "message" | "notification";
  reelId : string;
  createPost : boolean;
  createStory : boolean;
}

const initialState: initial = {
  smallSidebar: false,
  createChat: false,
  messageDialog : false,
  notificationDialog : false,
  searchDialog : false,
  sidebarItem : "_",
  isReelCommentsOpen : false,
  reelId : "",
  createPost : false,
  createStory : false,
};

const miscSlice = createSlice({
  name: "misc",
  initialState,
  reducers: {
    setSmallSidebar: (state) => {
      state.smallSidebar = !state.smallSidebar;
    },
    openSmallSidebar : (state) => {
      state.smallSidebar = true;
    },
    closeSmallSidebar: (state) => {
      state.smallSidebar = false;
    },
    openCreateChatDialog: (state) => {
      state.createChat = true;
    },
    closeCreateChatDialog: (state) => {
      state.createChat = false;
    },
    
    setSidebarItemSearch : (state) => {
      state.sidebarItem = "search";
    },
    setSidebarItemMessage : (state) => {
      state.sidebarItem = "message";
    },
    setSidebarItemNotification : (state) => {
      state.sidebarItem = "notification";
    },
    setSidebarItemHome : (state) => {
      state.sidebarItem = "_";
    },
    setReelCommentSectionOpen : (state) => {
      state.isReelCommentsOpen = !state.isReelCommentsOpen;
    },
    setReelId : (state,action) => {
      state.reelId = action.payload;
    },
    setCreatePost : (state) => {
      state.createPost = !state.createPost;
    },
    closeCreatePostDialog : (state) => {
      state.createPost = false;
    },
    setCreateStory : (state) => {
      state.createStory = !state.createStory;
    },
    
  },
});

export const {
  setSmallSidebar,
  closeSmallSidebar,
  openCreateChatDialog,
  closeCreateChatDialog,
  openSmallSidebar,
  setSidebarItemMessage,
  setSidebarItemNotification,
  setSidebarItemSearch,
  setSidebarItemHome,
  setReelCommentSectionOpen,
  setReelId,
  setCreatePost,
  closeCreatePostDialog,
  setCreateStory
} = miscSlice.actions;
export default miscSlice;
