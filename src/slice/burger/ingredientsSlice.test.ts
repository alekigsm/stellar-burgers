/* 
// При вызове экшена Request булевая переменная, отвечающая за текущий
//  запрос (например, store.isLoading) меняется на true.
// При вызове экшена Success fullfiled и передаче в него ингредиентов эти данные записываются в
// стор (например, в [store.data](http://store.data)) и store.isLoading меняется на false.
// При вызове экшена Failed и передаче в него ошибки она записывается в
// стор (например, store.error) и store.isLoading меняется на false
 */
import * as api from '@api';
import store from '../../services/store';
import { getIngredients } from './actions';

describe('api ingredientsSlice', () => {
  const mockIngredients = [
    {
      _id: '643d69a5c3f7b9001cfa0941',
      name: 'Биокотлета из марсианской Магнолии',
      type: 'main',
      proteins: 420,
      fat: 142,
      carbohydrates: 242,
      calories: 4242,
      price: 424,
      image: 'https://code.s3.yandex.net/react/code/meat-01.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png'
    },
    {
      _id: '643d69a5c3f7b9001cfa093c',
      name: 'Краторная булка N-200i',
      type: 'bun',
      proteins: 80,
      fat: 24,
      carbohydrates: 53,
      calories: 420,
      price: 1255,
      image: 'https://code.s3.yandex.net/react/code/bun-02.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png'
    },
    {
      _id: '643d69a5c3f7b9001cfa0945',
      name: 'Соус с шипами Антарианского плоскоходца',
      type: 'sauce',
      proteins: 101,
      fat: 99,
      carbohydrates: 100,
      calories: 100,
      price: 88,
      image: 'https://code.s3.yandex.net/react/code/sauce-01.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/sauce-01-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/sauce-01-large.png'
    }
  ];
  it('api Success', async () => {
    const apiSpy = jest
      .spyOn(api, 'getIngredientsApi')
      .mockImplementation(() => {
        const ingredientsStateSuc = store.getState().ingredients;
        expect(ingredientsStateSuc.loading).toEqual(true);
        return Promise.resolve(mockIngredients);
      });

    await store.dispatch(getIngredients());
    expect(api.getIngredientsApi).toHaveBeenCalledTimes(1);
    const ingredientsState = store.getState().ingredients;
    expect(ingredientsState.ingredients).toEqual(mockIngredients);
    expect(ingredientsState.loading).toEqual(false);
    apiSpy.mockClear();
  });

  it('api Failed', async () => {
    const apiSpy = jest
      .spyOn(api, 'getIngredientsApi')
      .mockImplementation(() => Promise.reject({ data: [], success: false }));

    await store.dispatch(getIngredients());
    expect(api.getIngredientsApi).toHaveBeenCalledTimes(1);
    const ingredientsState = store.getState().ingredients;
    expect(ingredientsState.error).toEqual('Rejected');
    expect(ingredientsState.loading).toEqual(false);
    apiSpy.mockClear();
  });
});
