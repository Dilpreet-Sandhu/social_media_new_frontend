import { createSlice } from "@reduxjs/toolkit";

interface initial {
  smallSidebar: boolean;
  createChat: boolean;
  messageDialog : boolean;
  notificationDialog : boolean;
  searchDialog : boolean;
  sidebarItem : "_" | "search" | "message" | "notification";
}

const initialState: initial = {
  smallSidebar: false,
  createChat: false,
  messageDialog : false,
  notificationDialog : false,
  searchDialog : false,
  sidebarItem : "_",
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
    }
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
} = miscSlice.actions;
export default miscSlice;
