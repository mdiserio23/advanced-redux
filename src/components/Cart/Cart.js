import { useDispatch, useSelector } from "react-redux";
import { productsAction } from "../../store/Products/products";
import Card from "../UI/Card";
import classes from "./Cart.module.css";
import CartItem from "./CartItem";

const Cart = (props) => {
  const showCartList = useSelector((state) => state.cart.showCartList);
  const selectedProductsList = useSelector(
    (state) => state.products.selectedProducts
  );
  const dispatch = useDispatch();

  const addItemHandler = (item) => {
    dispatch(productsAction.addToCart(item));
  };

  const removeItemHandler = (item) => {
    dispatch(productsAction.removeToCart(item));
  };

  const cartItem =
    showCartList &&
    selectedProductsList.map((item) => {
      return (
        <ul key={item.id}>
          <CartItem
            item={item}
            onAddItem={addItemHandler}
            onRemoveItem={removeItemHandler}
          />
        </ul>
      );
    });

  return (
    <Card className={classes.cart}>
      <h2>Your Shopping Cart</h2>
      {cartItem}
    </Card>
  );
};

export default Cart;
