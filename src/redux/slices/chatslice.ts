//@ts-nocheck
import { NEW_MESSAGE_ALERT } from "@/constants/constants";
import { getOrSaveToLocalStorage } from "@/lib/utils";
import { createSlice } from "@reduxjs/toolkit";


interface chatsliceTypes {
    chatId : string;
    count : number;
}   

const initialState  = {
    newMessageAlert : getOrSaveToLocalStorage({get : true,key : NEW_MESSAGE_ALERT}) || [],
}


const chatSlice = createSlice({
    name  :"chat",
    initialState,
    reducers : {

        setNewMessageAlert(state,action : {payload : string}) {
            let index = state.newMessageAlert.findIndex(item => item.chatId === action.payload);

            if (index > -1) {
                state.newMessageAlert[index].count += 1;
            }else {
                state.newMessageAlert.push({
                    chatId : action.payload,
                    count : 1
                });
            }

        },
        removeMessageAlert(state,action : {payload : string}) {

            state.newMessageAlert = state.newMessageAlert.filter(item => item.chatId !== action.payload);

        },


        
    }
});

export const {setNewMessageAlert,removeMessageAlert} = chatSlice.actions;
export default chatSlice;