import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./slices/products/ProductsSlice";
import userReducer from "./slices/user/UserSlice";

const store = configureStore({
  reducer: {
    products: productsReducer,
    user: userReducer,
  },
});

export default store;
