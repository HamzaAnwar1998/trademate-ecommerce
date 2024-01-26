import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { hostName } from "../../../config/config";

export const getProducts = createAsyncThunk(
  "products/getProducts",
  async () => {
    const request = await axios.get(`${hostName}/products`);
    const response = await request.data;
    return response;
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState: {
    loading: false,
    products: null,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state) => {
        state.loading = true;
        state.products = null;
        state.error = null;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
        state.error = null;
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.loading = false;
        state.products = null;
        state.error = action.error.message;
      });
  },
});

export default productsSlice.reducer;
