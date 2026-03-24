// import { createSlice } from "@reduxjs/toolkit";

// const token = localStorage.getItem('autoNowToken')
// let User=null
// const initial_State = {
//     user: User || {}
// };
// export const userSlice = createSlice({
//     name: 'user',
//     initialState: initial_State,
//     reducers: {
//         setUserData: (state, action) => {
// state.user=action.payload;
//         },
//         cleareUserData: (state) => {
//             state.user = {},
//                 localStorage.removeItem('autoNowToken')
//         }
//     }
// })

// export const { setUserData, cleareUserData } = userSlice.actions
// export default userSlice.reducer;


import { createSlice } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";

const token = localStorage.getItem('autoNowToken');

let user = null;

// ✅ Restore user from token if exists
if (token) {
    try {
        user = jwtDecode(token);
    } catch (error) {
        console.log("Invalid token");
        localStorage.removeItem('autoNowToken');
    }
}

const initial_State = {
    user: user || {}
};

export const userSlice = createSlice({
    name: 'user',
    initialState: initial_State,
    reducers: {
        setUserData: (state, action) => {
            state.user = action.payload;
        },
        cleareUserData: (state) => {
            state.user = {}; 
            localStorage.removeItem('autoNowToken');
        }
    }
});

export const { setUserData, cleareUserData } = userSlice.actions;
export default userSlice.reducer;