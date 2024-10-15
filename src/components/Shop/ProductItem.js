import { useDispatch } from 'react-redux';
import Card from '../UI/Card';
import classes from './ProductItem.module.css';
import { cartActions } from '../../store';

const ProductItem = ({ product }) => {
  const { name, price, description } = product;

  const dispatch = useDispatch();

  function addToCArtHandler() {
    dispatch(cartActions.addToCart(product));
  }

  return (
    <li className={classes.item}>
      <Card>
        <header>
          <h3>{name}</h3>
          <div className={classes.price}>${price.toFixed(2)}</div>
        </header>
        <p>{description}</p>
        <div className={classes.actions}>
          <button onClick={addToCArtHandler}>Add to Cart</button>
        </div>
      </Card>
    </li>
  );
};

export default ProductItem;
