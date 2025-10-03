import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TIngredient, TOrder, TOrdersData } from '@utils-types';
import { getFeeds } from './actions';

type TFeedsState = {
  feed: TOrdersData;
  loading: boolean;
  error: string | null;
};

const initialState: TFeedsState = {
  feed: {
    orders: [],
    total: 0,
    totalToday: 0
  },
  loading: false,
  error: null
};
export const feedSlice = createSlice({
  name: 'feed',
  initialState,
  //синхронные экшены
  reducers: {
    setFeeds: (state, action: PayloadAction<TOrdersData>) => {
      state.feed = action.payload;
    }
  },
  //селекторы состояния
  selectors: {
    getFeed: (state) => state.feed,
    getFeedsLoading: (state) => state.loading,
    getFeedsError: (state) => state.error
  },
  //обработка асинхронных экшенов
  extraReducers: (builder) => {
    builder
      .addCase(getFeeds.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getFeeds.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? 'Ошибка при загрузке ленты';
      })
      .addCase(getFeeds.fulfilled, (state, action) => {
        state.loading = false;
        state.feed = action.payload;
        state.error = null;
      });
  }
});

export const { setFeeds } = feedSlice.actions;
export const { getFeed, getFeedsLoading, getFeedsError } = feedSlice.selectors;
export default feedSlice.reducer;
