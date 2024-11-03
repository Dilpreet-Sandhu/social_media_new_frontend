import { createSlice } from "@reduxjs/toolkit";


interface initial {
    smallSidebar : boolean;
}

const initialState : initial = {
    smallSidebar : false
}

const miscSlice = createSlice({
    name : "misc",
    initialState,
    reducers : {

        setSmallSidebar : (state) => {
            state.smallSidebar = !state.smallSidebar;
        }
    }
});

export const {setSmallSidebar} = miscSlice.actions;
export default miscSlice;