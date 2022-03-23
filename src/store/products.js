import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedProducts: [],
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    addToCart(state, action) {
      const productExistIndex = state.selectedProducts.findIndex(
        (item) => item.id === action.payload.id
      );
      if (productExistIndex >= 0) {
        state.selectedProducts[productExistIndex] = {
          ...action.payload,
          quantity: state.selectedProducts[productExistIndex].quantity + 1,
          total:
            state.selectedProducts[productExistIndex].total +
            action.payload.price,
        };
        return;
      }
      state.selectedProducts = [
        ...state.selectedProducts,
        {
          ...action.payload,
          quantity: 1,
          total: action.payload.price,
        },
      ];
    },
    removeToCart(state, action) {
      const productExistIndex = state.selectedProducts.findIndex(
        (item) => item.id === action.payload.id
      );
      if(state.selectedProducts[productExistIndex].quantity === 1) {
        state.selectedProducts.splice(productExistIndex, 1);
        return;
      }
      state.selectedProducts[productExistIndex] = {
        ...action.payload,
        quantity: state.selectedProducts[productExistIndex].quantity - 1,
        total:
          state.selectedProducts[productExistIndex].total -
          action.payload.price,
      };
    },
  },
});
export default productsSlice.reducer;
export const productsAction = productsSlice.actions;
