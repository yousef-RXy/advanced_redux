import { createSlice } from '@reduxjs/toolkit';
import { uiActions } from './ui-slice';

const cartSlice = createSlice({
  name: 'cart-slice',
  initialState: {
    items: [],
    totalQuantity: 0,
  },
  reducers: {
    initCart(state, action) {
      state.items = action.payload.items || [];
      state.totalQuantity = action.payload.totalQuantity;
    },
    addToCart(state, action) {
      const { payload: item } = action;
      const existingItem = state.items.find(i => i.id === item.id);
      if (!existingItem)
        state.items.push({ ...item, quantity: 1, totalPrice: item.price });
      else {
        existingItem.quantity++;
        existingItem.totalPrice += item.price;
      }
      state.totalQuantity++;
    },
    removeFromCArt(state, action) {
      const { payload: id } = action;
      const existingItem = state.items.find(i => i.id === id);
      if (existingItem.quantity === 1)
        state.items = state.items.filter(i => i.id !== id);
      else {
        existingItem.quantity--;
        existingItem.totalPrice -= existingItem.price;
      }
      state.totalQuantity--;
    },
    increaseQuantity(state, action) {
      const { payload: id } = action;
      const existingItem = state.items.find(i => i.id === id);
      existingItem.quantity++;
      existingItem.totalPrice += existingItem.price;
      state.totalQuantity++;
    },
    decreaseQuantity(state, action) {
      const { payload: id } = action;
      const existingItem = state.items.find(i => i.id === id);
      if (existingItem.quantity === 1)
        state.items = state.items.filter(i => i.id !== id);
      else {
        existingItem.quantity--;
        existingItem.totalPrice -= existingItem.price;
      }
      state.totalQuantity--;
    },
  },
});

export function getCartData() {
  return async dispatch => {
    let resData;

    try {
      const res = await fetch('firebase Link');
      if (!res.ok) {
        throw new Error('sending cart data failed!');
      }
      resData = await res.json();
    } catch (err) {
      dispatch(
        uiActions.showNotification({
          status: 'error',
          title: 'Error!',
          message: 'Sending cart data failed!',
        })
      );
    }

    return resData;
  };
}

export function sendCartData(cartData) {
  return async dispatch => {
    dispatch(
      uiActions.showNotification({
        status: 'pending',
        title: 'Sending...',
        message: 'Sending cart data!',
      })
    );
    try {
      const res = await fetch('firebase Link', {
        method: 'PUT',
        body: JSON.stringify(cartData),
      });
      if (!res.ok) {
        throw new Error('sending cart data failed!');
      }
    } catch (err) {
      dispatch(
        uiActions.showNotification({
          status: 'error',
          title: 'Error!',
          message: 'Sending cart data failed!',
        })
      );
    }
    dispatch(
      uiActions.showNotification({
        status: 'success',
        title: 'Success!',
        message: 'Sent cart data successfully!',
      })
    );
  };
}

export const cartActions = cartSlice.actions;
export default cartSlice;
