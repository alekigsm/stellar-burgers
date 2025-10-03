import {
  forgotPasswordApi,
  getUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi,
  TLoginData,
  updateUserApi
} from '@api';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { setIsAuthChecked, setUser } from './userSlice';
import { setCookie } from '../../utils/cookie';

export const login = createAsyncThunk(
  'user/login',
  async (data: TLoginData, { rejectWithValue }) => {
    try {
      const response = await loginUserApi(data);
      setCookie('accessToken', data.email);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getUser = createAsyncThunk(
  'user/getUser',
  async (_, { rejectWithValue }) => {
    try {
      return await getUserApi();
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const logout = createAsyncThunk(
  'user/logout',
  async (_, { rejectWithValue }) => {
    try {
      return await logoutApi();
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

/* export const checkUserAuth = createAsyncThunk(
  'user/checkUserAuth',
  async (_, { dispatch }) => {
    if (api.isTokenExists()) {
      api
        .getUser()
        .then((user) => {
          dispatch(setUser(user));
        })
        .finally(() => dispatch(setIsAuthChecked(true)));
    } else {
      dispatch(setIsAuthChecked(true));
    }
  }
); */
/* 
export const registerUser = createAsyncThunk(
  'user/register',
  async (_, { rejectWithValue }) => {
    try {
      return await registerUserApi();
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const forgotPassword = createAsyncThunk(
  'user/forgotPassword',
  async (_, { rejectWithValue }) => {
    try {
      return await forgotPasswordApi();
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const resetPassword = createAsyncThunk(
  'user/resetPassword',
  async (_, { rejectWithValue }) => {
    try {
      return await resetPasswordApi();
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const updateUser = createAsyncThunk(
  'user/update',
  async (_, { rejectWithValue }) => {
    try {
      return await updateUserApi();
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);


 */
