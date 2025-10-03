import { orderBurgerApi } from '@api';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const orderBurger = createAsyncThunk(
  'orders/burger',
  async (ingredients: string[], { rejectWithValue }) => {
    try {
      return await orderBurgerApi(ingredients);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
