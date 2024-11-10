import { createSlice } from "@reduxjs/toolkit";

interface initial {
  smallSidebar: boolean;
  createChat: boolean;
  messageDialog : boolean;
}

const initialState: initial = {
  smallSidebar: false,
  createChat: false,
  messageDialog : false,
};

const miscSlice = createSlice({
  name: "misc",
  initialState,
  reducers: {
    setSmallSidebar: (state) => {
      state.smallSidebar = !state.smallSidebar;
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
    openMessageDialog : (state) => {
      state.messageDialog = true;
    },
    closeMessgeDialog : (state) => {
      state.messageDialog = false;
    }
  },
});

export const {
  setSmallSidebar,
  closeSmallSidebar,
  openCreateChatDialog,
  closeCreateChatDialog,
  openMessageDialog,
  closeMessgeDialog,
} = miscSlice.actions;
export default miscSlice;
