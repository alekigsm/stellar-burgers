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
  user: { email: 'ya@.ru', name: 'Sascha beliy' },
  isAuthChecked: false,
  error: null
};

import { setUser, userSlice } from '../user/userSlice';
import store from 'src/services/store';

describe('userSlice', () => {
  it('setUser', () => {
    const newState = userSlice(initialState, setUser());
    // достаем массив треков из состояния
    const { ingredients } = newState;

    // сравниваем то что получилось с ожидаемым результатом
    expect(ingredients).toEqual(sortedIngredients);
  });
});
