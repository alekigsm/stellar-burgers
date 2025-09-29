import { getUserApi } from '@api';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const getUser = createAsyncThunk(
  'user/getAll',
  async (_, { rejectWithValue }) => {
    try {
      return await getUserApi();
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
