import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { getOrderByNumber, getOrders } from './actions';

type TOrdersState = {
  orders: TOrder[];
  loading: boolean;
  error: string | null;
  ordersByNumber: TOrder[];
};

const initialState: TOrdersState = {
  orders: [],
  loading: false,
  error: null,
  ordersByNumber: []
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
    selectorOrders: (state) => state.orders,
    getOrdersLoading: (state) => state.loading,
    getOrdersError: (state) => state.error,
    selectorOrderByNumber: (state) => state.ordersByNumber
  },
  //обработка асинхронных экшенов
  extraReducers: (builder) => {
    builder
      .addCase(getOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? 'Ошибка при загрузке ленты';
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(getOrderByNumber.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getOrderByNumber.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? 'Ошибка при загрузке ленты';
      })
      .addCase(getOrderByNumber.fulfilled, (state, action) => {
        state.loading = false;
        state.ordersByNumber = action.payload.orders;
      });
  }
});

export const {
  selectorOrders,
  getOrdersLoading,
  getOrdersError,
  selectorOrderByNumber
} = orderSlice.selectors;
export const { setOrders } = orderSlice.actions;
export default orderSlice.reducer;
