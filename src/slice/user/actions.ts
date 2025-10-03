import {
  forgotPasswordApi,
  getUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi,
  resetPasswordApi,
  TLoginData,
  TRegisterData,
  updateUserApi
} from '@api';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { getCookie, setCookie } from '../../utils/cookie';
//refreshToken
export const login = createAsyncThunk(
  'user/login',
  async (data: TLoginData, { rejectWithValue }) => {
    try {
      const response = await loginUserApi(data);
      setCookie('accessToken', response.accessToken);
      localStorage.setItem('refreshToken', response.refreshToken);
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

export const registerUser = createAsyncThunk(
  'user/register',
  async (data: TRegisterData, { rejectWithValue }) => {
    try {
      return await registerUserApi(data);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const forgotPassword = createAsyncThunk(
  'user/forgotPassword',
  async (email: string, { rejectWithValue }) => {
    try {
      return await forgotPasswordApi({ email: email });
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const resetPassword = createAsyncThunk(
  'user/resetPassword',
  async (password: string, { rejectWithValue }) => {
    try {
      return await resetPasswordApi({
        password: password,
        token: getCookie('accessToken') || ''
      });
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const updateUser = createAsyncThunk(
  'user/update',
  async (user: Partial<TRegisterData>, { rejectWithValue }) => {
    try {
      return await updateUserApi(user);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
