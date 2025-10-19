import { getOrderByNumberApi, getOrdersApi, orderBurgerApi } from '@api';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const getOrders = createAsyncThunk(
  'orders/getorders',
  async (_, { rejectWithValue }) => {
    try {
      return await getOrdersApi();
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getOrderByNumber = createAsyncThunk(
  'orders/bynumber',
  async (number: number, { rejectWithValue }) => {
    try {
      await getOrdersApi();
      return await getOrderByNumberApi(number);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
