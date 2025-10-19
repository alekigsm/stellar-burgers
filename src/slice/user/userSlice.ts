import {
  createSlice,
  PayloadAction,
  createSelector,
  isAction
} from '@reduxjs/toolkit';
import { TUser } from '@utils-types';
import {
  forgotPassword,
  getUser,
  login,
  logout,
  registerUser,
  resetPassword,
  updateUser
} from './actions';

type TUserState = {
  user: TUser | null;
  isAuthChecked: boolean;
  error?: string | null;
};

const initialState: TUserState = {
  user: null,
  isAuthChecked: false,
  error: null
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<TUser | null>) => {
      state.user = action.payload;
      state.error = null;
    },
    setIsAuthChecked: (state, action: PayloadAction<boolean>) => {
      state.isAuthChecked = action.payload;
      state.error = null;
    }
  },
  selectors: {
    getUserData: (state) => state.user,
    getAuthChecked: (state) => state.isAuthChecked
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isAuthChecked = true;
      })
      .addCase(login.pending, (state) => {
        state.error = null;
      })
      .addCase(login.rejected, (state) => {
        state.error = null;
        state.isAuthChecked = true;
      })
      .addCase(getUser.pending, (state) => {
        state.error = null;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.error =
          action.error.message ?? 'Ошибка при загрузке данных пользователя';
        state.isAuthChecked = true;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.error = null;
        state.isAuthChecked = true;
      })
      .addCase(registerUser.pending, (state) => {
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.error =
          action.error.message ?? 'Ошибка при загрузке данных пользователя';
        state.isAuthChecked = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.error = null;
        state.isAuthChecked = true;
      })
      .addCase(forgotPassword.pending, (state) => {
        state.error = null;
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.error =
          action.error.message ?? 'Ошибка при загрузке данных пользователя';
      })
      .addCase(forgotPassword.fulfilled, (state) => {
        state.error = null;
      })
      .addCase(resetPassword.pending, (state) => {
        state.error = null;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.error =
          action.error.message ?? 'Ошибка при загрузке данных пользователя';
      })
      .addCase(resetPassword.fulfilled, (state) => {
        state.error = null;
      })
      .addCase(updateUser.pending, (state) => {
        state.error = null;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.error =
          action.error.message ?? 'Ошибка при загрузке данных пользователя';
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.error = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
      });
  }
});

// Экспорты
export const { setUser, setIsAuthChecked } = userSlice.actions;
export const { getUserData, getAuthChecked } = userSlice.selectors;

export default userSlice.reducer;
