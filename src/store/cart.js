import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showCartList: false,
  showNotification: null
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    showingCartListHandler(state) {
      state.showCartList = !state.showCartList;
    },
    setNotification(state, action) {
      state.showNotification = {
        status: action.payload.status,
        title: action.payload.title,
        message: action.payload.message,
      }
    }
  },
});

export default cartSlice.reducer;
export const cartActions = cartSlice.actions;
