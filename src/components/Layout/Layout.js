import { Fragment } from 'react';
import { useDispatch } from 'react-redux';
import { cartActions } from '../../store/cart';
import MainHeader from './MainHeader';

const Layout = (props) => {
  const dispatch = useDispatch();

  const showCartListHandler = () => {
    dispatch(cartActions.showingCartListHandler());
  }
  return (
    <Fragment>
      <MainHeader showCartList={showCartListHandler}/>
      <main>{props.children}</main>
    </Fragment>
  );
};

export default Layout;
