import { createSlice } from "@reduxjs/toolkit";
const initialState = { isAuth: false}
const authslice = createSlice({
   name:"auth",
   initialState: initialState,
reducers:{
    login: (state, action)=>{
        state.isAuth =  true;
    }
}
});

export const {login} =  authslice.actions;

export default authslice.reducer;