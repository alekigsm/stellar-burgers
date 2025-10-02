import { orderBurgerApi } from '@api';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const getOrderBurger = createAsyncThunk(
  'burger/orders',
  async (ingredients: string[], { rejectWithValue }) => {
    try {
      return await orderBurgerApi(ingredients);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
