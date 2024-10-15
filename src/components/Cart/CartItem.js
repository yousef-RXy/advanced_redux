import { useDispatch } from 'react-redux';
import classes from './CartItem.module.css';
import { cartActions } from '../../store';

const CartItem = ({ item }) => {
  const { name, quantity, totalPrice, price, id } = item;

  const dispatch = useDispatch();

  function increaseQuantity() {
    dispatch(cartActions.increaseQuantity(id));
  }
  function decreaseQuantity() {
    dispatch(cartActions.decreaseQuantity(id));
  }

  return (
    <li className={classes.item}>
      <header>
        <h3>{name}</h3>
        <div className={classes.price}>
          ${totalPrice.toFixed(2)}{' '}
          <span className={classes.itemprice}>(${price.toFixed(2)}/item)</span>
        </div>
      </header>
      <div className={classes.details}>
        <div className={classes.quantity}>
          x <span>{quantity}</span>
        </div>
        <div className={classes.actions}>
          <button onClick={decreaseQuantity}>-</button>
          <button onClick={increaseQuantity}>+</button>
        </div>
      </div>
    </li>
  );
};

export default CartItem;
