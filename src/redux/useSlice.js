import { createSlice } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";

const token = localStorage.getItem('autoNowToken');

let user = null;

// ✅ Restore user from token if exists
if (token) {
    try {
        user = jwtDecode(token);
        console.log(user);
        
    } catch (error) {
        console.log("Invalid token");
        localStorage.removeItem('autoNowToken');
    }
}

const initial_State = {
    user: user || null
};

export const userSlice = createSlice({
    name: 'user',
    initialState: initial_State,
    reducers: {
        setUserData: (state, action) => {
            state.user = action.payload;
        },
        clearUserData: (state) => {
            state.user = null; 
            localStorage.removeItem('autoNowToken');
        }
    }
});

export const { setUserData, clearUserData } = userSlice.actions;
export default userSlice.reducer;