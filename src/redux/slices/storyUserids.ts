import { createSlice } from "@reduxjs/toolkit";


interface user {
    _id : string;
    username : string;
    avatar : string;
}

interface storyUserIds {

    users : user[] | null

};

const initialState : storyUserIds = {
    users : null
}


const storyUserIdsSlice = createSlice({
    name : "storyids",
    initialState,
    reducers : {
        addIds(state,action) {

            state.users = action.payload;

        }
    }
});

export const {addIds} = storyUserIdsSlice.actions;
export default storyUserIdsSlice;