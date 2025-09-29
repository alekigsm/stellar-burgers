import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TUser } from '@utils-types';
import { getUser } from './actions';

type TUserState = {
  email: string;
  name: string;
  loading: boolean;
  error: string | null;
  success: boolean;
};

const initialState: TUserState = {
  email: '',
  name: '',
  loading: false,
  error: null,
  success: false
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    clearUser: (state) => {
      state.email = '';
      state.name = '';
      state.error = null;
      state.success = false;
    },
    setUser: (
      state,
      action: PayloadAction<{ email: string; name: string }>
    ) => {
      state.email = action.payload.email;
      state.name = action.payload.name;
      state.success = true;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
      state.success = false;
    }
  },
  selectors: {
    getUserData: (state) => ({ email: state.email, name: state.name }),
    getUserEmail: (state) => state.email,
    getUserName: (state) => state.name,
    getUserLoading: (state) => state.loading,
    getUserError: (state) => state.error,
    getUserSuccess: (state) => state.success
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.error.message ?? 'Ошибка при загрузке данных пользователя';
        state.success = false;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.loading = false;
        state.email = action.payload.user.email;
        state.name = action.payload.user.name;
        state.error = null;
        state.success = true;
      });
  }
});

// Экспорты
export const { clearUser, setUser, setError } = userSlice.actions;
export const {
  getUserData,
  getUserEmail,
  getUserName,
  getUserLoading,
  getUserError,
  getUserSuccess
} = userSlice.selectors;

export default userSlice.reducer;
