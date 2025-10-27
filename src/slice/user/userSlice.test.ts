import { TUser } from '@utils-types';
import userSlice, { setIsAuthChecked, setUser } from '../user/userSlice';
import store from 'src/services/store';

describe('userSlice', () => {
  it('setUser', () => {
    const initialState = {
      user: null,
      isAuthChecked: false,
      error: null
    };
    const newUser = { email: 'ya@.ru', name: 'Sascha beliy' };
    const newState = userSlice(initialState, setUser(newUser));
    // достаем массив треков из состояния
    const user = newState;

    // сравниваем то что получилось с ожидаемым результатом
    expect(user.user).toEqual(newUser);
  });
  it('setIsAuthChecked', () => {
    const initialState = {
      user: null,
      isAuthChecked: false,
      error: null
    };
    const newState = userSlice(initialState, setIsAuthChecked(true));
    // достаем массив треков из состояния

    // сравниваем то что получилось с ожидаемым результатом
    expect(newState.isAuthChecked).toEqual(true);
  });
});
