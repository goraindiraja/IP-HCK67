import { configureStore } from "@reduxjs/toolkit";
import dataSlice from "./dataSlice";

export default configureStore({
    reducer: {
        dataSlice
    }
})

