import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";

const sapStore = configureStore({
    reducer: {
        loggedInUser:userSlice.reducer
    },
   
})
export default sapStore;