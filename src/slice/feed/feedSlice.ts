import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TIngredient, TOrder } from '@utils-types';
import { getFeed } from './actions';

/* 
type TFeedsState = {
  data: TFeedsResponse | null;  // или TServerResponse<...>
  loading: boolean;
  error: boolean;
};

const initialState: TFeedsState = {
  data: null,
  loading: false,
  error: false
}; */

type TFeedsState = {
  orders: TOrder[];
  total: number;
  totalToday: number;
  success: boolean;
  loading: boolean;
  error: string | null;
};

const initialState: TFeedsState = {
  orders: [],
  total: 0,
  totalToday: 0,
  success: false,
  loading: false,
  error: null
};
export const feedSlice = createSlice({
  name: 'feed',
  initialState,
  //синхронные экшены
  reducers: {
    /*    addIngredient: (state, action: PayloadAction<TIngredient>) => {
      state.ingredients.push(action.payload);
    },
    removeIngredient: (state, action: PayloadAction<string>) => {
      state.ingredients = state.ingredients.filter(
        (b) => b._id !== action.payload
      );
    } */
  },
  //селекторы состояния
  selectors: {
    getFeeds: (state) => state
  },
  //обработка асинхронных экшенов
  extraReducers: (builder) => {
    builder
      .addCase(getFeed.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getFeed.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? 'Ошибка при загрузке ленты';
      })
      .addCase(getFeed.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload.orders; // ← массив заказов
        state.total = action.payload.total; // ← общее количество
        state.totalToday = action.payload.totalToday; // ← за сегодня
        state.success = action.payload.success; // ← статус успеха
      });
  }
});

//export const { addIngredient, removeIngredient } = ingredientsSlicer.actions;
export const { getFeeds } = feedSlice.selectors;
export default feedSlice.reducer;
