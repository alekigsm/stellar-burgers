import { combineSlices, configureStore } from '@reduxjs/toolkit';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';
import { ingredientsSlicer } from '../slice/burger/ingredientsSlice';
import { userSlice } from '../slice/user/userSlice';
import { orderSlice } from '../slice/order/orderSlice';
import { feedSlice } from '../slice/feed/feedSlice';
import { burgerConstructorSlicer } from '../slice/constructor/constructorSlice';
export const rootReducer = combineSlices(
  ingredientsSlicer,
  userSlice,
  orderSlice,
  feedSlice,
  burgerConstructorSlicer
);
const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
