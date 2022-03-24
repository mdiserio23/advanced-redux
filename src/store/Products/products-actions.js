import { cartActions } from "../cart";
import sendRequest from "../../utils/send-request";
import { productsAction } from "./products";

export const retrieveProducts = () => {
  return async (dispatch) => {
    try {
     const allProductsList = await sendRequest({
        url: "https://react-http-2083a-default-rtdb.firebaseio.com/products.json",
      });
      dispatch(productsAction.setAllProductsList(allProductsList))
    } catch (error) {
      dispatch(
        cartActions.setNotification({
          status: "error",
          title: "Error",
          message: "Send data is failed",
        })
      );
    }
  };
};

//action creator
export const sendCartData = (selectedProducts) => {
  return async (dispatch) => {
    dispatch(
      cartActions.setNotification({
        status: "pending",
        title: "Loading...",
        message: "Send data is loading..",
      })
    );
    try {
      await sendRequest({
        url: "https://react-http-2083a-default-rtdb.firebaseio.com/productsSelected.json",
        body: selectedProducts,
        method: "PUT",
      });
      dispatch(
        cartActions.setNotification({
          status: "success",
          title: "Success",
          message: "Send data is done",
        })
      );
    } catch (error) {
      dispatch(
        cartActions.setNotification({
          status: "error",
          title: "Error",
          message: "Send data is failed",
        })
      );
    }
  };
};
