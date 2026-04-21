import { createSlice } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode"; // ✅ import this

const token = localStorage.getItem("sarathi");

let driver = null;

// Restore driver from token
if (token) {
  try {
    driver = jwtDecode(token);
    console.log(driver)
  } catch (error) {
    console.log("Invalid token");
    localStorage.removeItem("sarathi");
  }
}

const initialState = {
  driver: driver || null,
};

export const driverSlice = createSlice({
  name: "driver",
  initialState,
  reducers: {
    setDriverData: (state, action) => {
      state.driver = action.payload;
      // localStorage.setItem("sarathi", action.payload.token); // optional
    },
    clearDriverData: (state) => {
      state.driver = null;
      localStorage.removeItem("sarathi");
    },
  },
});

// ✅ correct export
export const { setDriverData, clearDriverData } = driverSlice.actions;

export default driverSlice.reducer;