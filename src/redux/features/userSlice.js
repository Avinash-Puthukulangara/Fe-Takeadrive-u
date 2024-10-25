import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  user: {},
  userAuthorised: false
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    saveUser: (state, action) => {
      state.user = action.payload;
      state.userAuthorised = true; 
    },
    clearUser: (state) => {
        state.user = {};
        state.userAuthorised = false; 
      }
  },
})

export const { saveUser, clearUser } = userSlice.actions

export default userSlice.reducer