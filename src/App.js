import { useDispatch, useSelector } from 'react-redux';
import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import { useEffect } from 'react';
import { cartActions, getCartData, sendCartData } from './store';
import Notification from './components/UI/Notification';

let isInitial = true;
let isFetchCart = true;

function App() {
  const dispatch = useDispatch();
  const cartIsVisible = useSelector(state => state.ui.cartIsVisible);
  const notification = useSelector(state => state.ui.notification);
  const cart = useSelector(state => state.cart);

  useEffect(() => {
    (async () => {
      if (isInitial) {
        isInitial = false;
        const cartData = await dispatch(getCartData());
        dispatch(cartActions.initCart(cartData));
        return;
      }
      if (isFetchCart) {
        isFetchCart = false;
        return;
      }
      dispatch(sendCartData(cart));
    })();
  }, [cart, dispatch]);
  return (
    <>
      {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}
      <Layout>
        {cartIsVisible && <Cart />}
        <Products />
      </Layout>
    </>
  );
}

export default App;
