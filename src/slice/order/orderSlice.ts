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
    setOrders: (state, action: PayloadAction<TOrder[]>) => {
      state.orders = action.payload;
    }
  },
  //селекторы состояния
  selectors: {
    getOrders: (state) => state.orders,
    getOrdersLoading: (state) => state.loading,
    getOrdersError: (state) => state.error
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

export const { getOrders, getOrdersLoading, getOrdersError } =
  orderSlice.selectors;
export const { setOrders } = orderSlice.actions;
export default orderSlice.reducer;
