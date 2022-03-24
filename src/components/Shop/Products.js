import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { productsAction } from "../../store/Products/products";
import { retrieveProducts } from "../../store/Products/products-actions";
import ProductItem from "./ProductItem";
import classes from "./Products.module.css";

const Products = (props) => {
  const allProductsList = useSelector((state) => state.products.allProductsList);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(retrieveProducts());
  }, [dispatch]);

  const onAddToCartHandler = (item) => {
    dispatch(productsAction.addToCart(item));
  };

  const productItem =
    allProductsList.length !== 0 &&
    allProductsList.map((item) => {
      return (
        <ul key={item.id}>
          <ProductItem
            id={item.id}
            onAddToCart={onAddToCartHandler}
            title={item.title}
            price={item.price}
            description={item.description}
          />
        </ul>
      );
    });
  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      {productItem}
    </section>
  );
};

export default Products;
