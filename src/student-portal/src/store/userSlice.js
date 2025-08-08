
// import { createSlice } from "@reduxjs/toolkit";

// const userSlice = createSlice({
//   name: "loggedInUser",
//   initialState: null, // single user object or null
//   reducers: {
//     setUser: (state, action) => action.payload,
//     clearUser: () => null,  // Clear user on logout
//   },
// });

// export const userAction = userSlice.actions;
// export default userSlice;


// store/userSlice.js
import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "loggedInUser",
  initialState: null, // single user object or null
  reducers: {
    setUser: (state, action) => action.payload,
    clearUser: () => null,  // Clear user on logout
  },
});

export const userAction = userSlice.actions;
export default userSlice;
