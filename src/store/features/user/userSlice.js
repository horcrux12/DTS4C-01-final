import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    userData: {}
}

const userSlice = createSlice({
  name: 'user-slice',
  initialState: initialState,
  reducers: {
    login : (state, action) => { state.userData = action.payload },
    logout: (state) => {state = initialState},
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;