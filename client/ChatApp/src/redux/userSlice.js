import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
    name: "user",
    initialState: {
        currentId: null,
        name: '',
        email: '',
        imageUrl: ''
    },
    reducers: {
        login: (state, action) => {
            state.currentId = action.payload.currentId
            state.name = action.payload.name
            state.email = action.payload.email
            state.imageUrl = action.payload.imageUrl
        }
    }
})

export const {login} = userSlice.actions

export default userSlice.reducer