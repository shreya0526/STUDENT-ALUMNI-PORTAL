// import { createSlice } from "@reduxjs/toolkit";

// const userSlice=createSlice({
//     name: 'user',
//     initialState: [],
//     reducers: {
//         setUser: (state, action) => {
//             return action.payload;
//         },
//     },
// });

// export const  userAction = userSlice.actions;
// export default userSlice;


import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: 'loggedInUser',
    initialState: null,  // null is better than [] for a single user object
    reducers: {
        setUser: (state, action) => {
            return action.payload;
        },
        clearUser: () => {
            return null; // reset user data
        }
    },
});

export const userAction = userSlice.actions;
export default userSlice;
