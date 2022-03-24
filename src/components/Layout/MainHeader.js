import CartButton from '../Cart/CartButton';
import classes from './MainHeader.module.css';

const MainHeader = (props) => {
  return (
    <header className={classes.header}>
      <h1>ReduxCart</h1>
      <nav>
        <ul>
          <li>
            <CartButton showCartList={props.showCartList}/>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default MainHeader;
