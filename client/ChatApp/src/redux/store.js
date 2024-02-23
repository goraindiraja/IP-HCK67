import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import dataSlice from "./dataSlice";

export default configureStore({
    reducer: {
        userSlice,
        dataSlice
    }
})

