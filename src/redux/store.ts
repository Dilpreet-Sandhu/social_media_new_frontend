import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/userSlice";
import miscSlice from "./slices/miscSlice";
import { setupListeners } from "@reduxjs/toolkit/query";
import { TypedUseSelectorHook, useSelector } from "react-redux";
import api from "./slices/apiSlice";

 const store = configureStore({
    reducer :{
        [userSlice.name] : userSlice.reducer,
        [api.reducerPath] : api.reducer, 
        [miscSlice.reducerPath] : miscSlice.reducer,
    },
    middleware : (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware),
});

type RootState = ReturnType<typeof store.getState>

setupListeners(store.dispatch);

export const useAppSelector : TypedUseSelectorHook<RootState> = useSelector;

export default store;