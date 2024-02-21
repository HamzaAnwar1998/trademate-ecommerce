import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../../firebase/config";

export const getCurrentUser = createAsyncThunk(
  "user/getCurrentUser",
  async () => {
    return new Promise((resolve) => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
          const userData = {
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
          };
          resolve(userData);
        }
      });
      // unsubscribe immediately
      return () => unsubscribe();
    });
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    userLoading: false,
    userData: null,
  },
  reducers: {
    clearUserData: (state) => {
      state.userData = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCurrentUser.pending, (state) => {
        state.userLoading = true;
        state.userData = null;
      })
      .addCase(getCurrentUser.fulfilled, (state, action) => {
        state.userLoading = false;
        state.userData = action.payload;
      })
      .addCase(getCurrentUser.rejected, (state) => {
        state.userLoading = false;
        state.userData = null;
      });
  },
});

export default userSlice.reducer;
export const { clearUserData } = userSlice.actions;
