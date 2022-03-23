import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useHttp from "../../hooks/use-http";
import { productsAction } from "../../store/products";
import ProductItem from "./ProductItem";
import classes from "./Products.module.css";

const Products = (props) => {
  const [allProductsList, setAllProductsList] = useState([]);
  const { isLoading, isError, sendRequest: retrieveProducts } = useHttp();
  const { sendRequest: sendAddProducts } = useHttp();
  const selectedProducts = useSelector(
    (state) => state.products.selectedProducts
  );
  const dispatch = useDispatch();

  useEffect(() => {
    sendAddProducts({
      url: "https://react-http-2083a-default-rtdb.firebaseio.com/productsSelected.json",
      body: selectedProducts,
      method: "PUT",
    });
  }, [selectedProducts, sendAddProducts]);

  useEffect(() => {
    retrieveProducts(
      {
        url: "https://react-http-2083a-default-rtdb.firebaseio.com/products.json",
      },
      setAllProductsList
    );
  }, [retrieveProducts]);

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
      {isLoading && <p>Is Loading...</p>}
      {!isLoading && isError && <p>Something went wrong.</p>}
      {!isLoading && !isError && productItem}
    </section>
  );
};

export default Products;
