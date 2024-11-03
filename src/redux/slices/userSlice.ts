import {createSlice} from '@reduxjs/toolkit';

export interface User  {

    user : {
        _id : string,
        username : string,
        email : string,
        password : string,
        avatar : string,
        following : string[],
        followers : string[],
        blockedUsers : string[],
        avatarPublicId : string,
        isPrivate : string,
        tags : string []
    } | undefined | null;
};

const initialState : User = {
    user : null,
}

const userSlice = createSlice({
    name : "user",
    initialState,
    reducers : {
        setUser : (state,action) => {
            state.user = action.payload;
        },
        removeUser : (state,action) => {
            state.user = action.payload;
        }
    }
    
})

export const {setUser,removeUser} = userSlice.actions;

export default userSlice;