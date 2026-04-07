import { createSlice } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode"; // ✅ import this

const token = localStorage.getItem("driver");

let driver = null;

// Restore driver from token
if (token) {
  try {
    driver = jwtDecode(token);
    console.log(driver)
  } catch (error) {
    console.log("Invalid token");
    localStorage.removeItem("driver");
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
      localStorage.setItem("driver", action.payload.token); // optional
    },
    clearDriverData: (state) => {
      state.driver = null;
      localStorage.removeItem("driver");
    },
  },
});

// ✅ correct export
export const { setDriverData, clearDriverData } = driverSlice.actions;

export default driverSlice.reducer;