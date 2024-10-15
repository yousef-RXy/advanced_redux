import { configureStore } from '@reduxjs/toolkit';

import uiSlice from './Slices/ui-slice';
import cartSlice from './Slices/cart-slice';

const store = configureStore({
  reducer: {
    ui: uiSlice.reducer,
    cart: cartSlice.reducer,
  },
});

export default store;
export { uiActions } from './Slices/ui-slice';
export { cartActions } from './Slices/cart-slice';
