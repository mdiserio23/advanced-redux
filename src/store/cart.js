import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showCartList: false,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    showingCartListHandler(state) {
      state.showCartList = !state.showCartList;
    },
  },
});

export default cartSlice.reducer;
export const cartActions = cartSlice.actions;
