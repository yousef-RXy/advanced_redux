import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart-slice',
  initialState: {
    items: [],
    totalQuantity: 0,
  },
  reducers: {
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

export const cartActions = cartSlice.actions;
export default cartSlice;
