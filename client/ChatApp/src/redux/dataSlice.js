import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getDataById = createAsyncThunk(
    'data/getDataById',
    async () => {
        let currentId = localStorage.getItem("currentId")
        let response = await axios.get("http://localhost:3000/users/"+currentId, {
            headers: {
                'Access-Control-Allow-Origin': '*',
                Authorization: `Bearer ${localStorage.getItem("access_token")}`
            }
        })

        return response.data
    }
)

export const dataSlice = createSlice({
    name: 'data',
    initialState: {
        data: {},
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getDataById.fulfilled, (state, action) => {
            console.log(action);
            state.data = action.payload
        })

        builder.addCase(getDataById.rejected, (state, action) => {
            console.log(action);
            state.error = action.error.message
        })
    }
})

export default dataSlice.reducer

