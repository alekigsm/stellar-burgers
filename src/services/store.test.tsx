import { expect, test } from '@jest/globals';
import store, { useDispatch } from '../services/store';
//test
// Написан тест, проверяющий правильную настройку и работу rootReducer:
//  вызов rootReducer с undefined состоянием и экшеном, который не обрабатывается ни одним редьюсером
//  (например, { type: 'UNKNOWN_ACTION' }), возвращает корректное начальное состояние хранилища.

describe('Проверяю инициализацию rootReducer', () => {
  it('инициализацию rootReducer ingredients', () => {
    const initialState = {
      ingredients: [],
      loading: false,
      error: null
    };
    const initStateStore = store.getState();

    expect(initStateStore.ingredients).toEqual(initialState);
  });
  it('инициализацию rootReducer user', () => {
    const initialState = {
      user: null,
      isAuthChecked: false,
      error: null
    };
    const initStateStore = store.getState();

    expect(initStateStore.user).toEqual(initialState);
  });
  it('инициализацию rootReducer orders', () => {
    const initialState = {
      orders: [],
      loading: false,
      error: null,
      ordersByNumber: []
    };
    const initStateStore = store.getState();

    expect(initStateStore.orders).toEqual(initialState);
  });
  it('инициализацию rootReducer feed', () => {
    const initialState = {
      feed: {
        orders: [],
        total: 0,
        totalToday: 0
      },
      loading: false,
      error: null
    };
    const initStateStore = store.getState();

    expect(initStateStore.feed).toEqual(initialState);
  });
  it('инициализацию rootReducer burgerConstructor', () => {
    const initialState = {
      constructorItems: {
        ingredients: [],
        bun: null
      },
      orderRequest: false,
      orderModalData: null,
      loading: false,
      error: null
    };
    const initStateStore = store.getState();

    expect(initStateStore.burgerConstructor).toEqual(initialState);
  });

  it('проверяю правильную настройку и работу rootReducer', () => {
    const initialState = {
      constructorItems: {
        ingredients: [],
        bun: null
      },
      orderRequest: false,
      orderModalData: null,
      loading: false,
      error: null
    };

    store.dispatch({ type: 'UNKNOWN_ACTION' });
    const initStateStore = store.getState();
    expect(initStateStore.burgerConstructor).toEqual(initialState);
  });
});
