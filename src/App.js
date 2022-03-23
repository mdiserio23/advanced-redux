import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import useHttp from "./hooks/use-http";
import { cartActions } from "./store/cart";
import Notification from "./components/UI/Notification";

let firstTime = true;

function App() {
  const { sendRequest } = useHttp();
  const dispatch = useDispatch();
  const selectedProducts = useSelector(
    (state) => state.products.selectedProducts
  );
  const notification = useSelector((state) => state.cart.showNotification);
  useEffect(() => {
    const sendAddProducts = (request) => {
      dispatch(
        cartActions.setNotification({
          status: "pending",
          title: "Loading...",
          message: "Send data is loading..",
        })
      );
      sendRequest(request);
      dispatch(
        cartActions.setNotification({
          status: "success",
          title: "Success",
          message: "Send data is done",
        })
      );
    };

    if (firstTime) {
      firstTime = false;
      return;
    }
    sendAddProducts({
      url: "https://react-http-2083a-default-rtdb.firebaseio.com/productsSelected.",
      body: selectedProducts,
      method: "PUT",
    });
  }, [selectedProducts, sendRequest, dispatch]);

  return (
    <>
      {notification && (
        <Notification
          title={notification.title}
          status={notification.status}
          message={notification.message}
        ></Notification>
      )}
      <Layout>
        <Cart />
        <Products />
      </Layout>
    </>
  );
}

export default App;
