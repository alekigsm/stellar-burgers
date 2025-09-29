import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { getOrder } from './actions';

type TOrdersState = {
  orders: TOrder[];
  loading: boolean;
  error: string | null;
};

const initialState: TOrdersState = {
  orders: [],
  loading: false,
  error: null
};
export const orderSlice = createSlice({
  name: 'orders',
  initialState,
  //синхронные экшены
  reducers: {
    addOrder: (state, action: PayloadAction<TOrder>) => {
      state.orders.push(action.payload);
    },
    removeOrder: (state, action: PayloadAction<string>) => {
      state.orders = state.orders.filter((b) => b._id !== action.payload);
    }
  },
  //селекторы состояния
  selectors: {
    getOrders: (state) => state.orders
  },
  //обработка асинхронных экшенов
  extraReducers: (builder) => {
    builder
      .addCase(getOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? 'Ошибка при загрузке ленты';
      })
      .addCase(getOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload; // ← массив заказов
      });
  }
});

//export const { addIngredient, removeIngredient } = ingredientsSlicer.actions;
export const { getOrders } = orderSlice.selectors;
export default orderSlice.reducer;
