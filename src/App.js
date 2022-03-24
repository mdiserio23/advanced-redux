import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import Notification from "./components/UI/Notification";
import { sendCartData } from "./store/Products/products-actions";

let firstTime = true;

function App() {
  const dispatch = useDispatch();
  const selectedProducts = useSelector(
    (state) => state.products.selectedProducts
  );
  const notification = useSelector((state) => state.cart.showNotification);

  useEffect(() => {
    if (firstTime) {
      firstTime = false;
      return;
    }
    dispatch(sendCartData(selectedProducts));
  }, [selectedProducts, dispatch]);

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
