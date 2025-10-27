import { expect, test } from '@jest/globals';
import store from '../../services/store';
import burgerConstructorSlicer, {
  addIngredient,
  moveIngredient,
  removeIngredient
} from '../constructor/constructorSlice';
//test
// Проверяют редьюсер слайса burgerConstructor:
// обработку экшена добавления ингредиента;
// обработку экшена удаления ингредиента;
// обработку экшена изменения порядка ингредиентов в начинке;

describe('редьюсер слайса burgerConstructor', () => {
  it('добавления ингредиента', () => {
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
    const ingredient = {
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
    };
    const ingredientBun = {
      _id: '643d69a5c3f7b9001cfa0921',
      name: 'Биокотлета из марсианской Магнолии',
      type: 'bun',
      proteins: 420,
      fat: 142,
      carbohydrates: 242,
      calories: 4242,
      price: 424,
      image: 'https://code.s3.yandex.net/react/code/meat-01.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png'
    };
    const newState = burgerConstructorSlicer(
      initialState,
      addIngredient(ingredient)
    );
    const ingredients = newState.constructorItems.ingredients;
    expect(ingredients.length).toBe(1);
    const firstElement = ingredients[0];
    expect(firstElement._id).toEqual(ingredient._id);

    const newStateBun = burgerConstructorSlicer(
      initialState,
      addIngredient(ingredientBun)
    );
    const bun = newStateBun.constructorItems.bun;
    expect(bun?.type).toBe('bun');
    expect(bun?._id).toEqual(ingredientBun._id);
  });

  it('удаление ингредиента', () => {
    const initialState = {
      constructorItems: {
        ingredients: [
          {
            id: '1',
            _id: '643d69a5c3f7b9001cfa0941',
            name: 'Биокотлета из марсианской Магнолии',
            type: 'main',
            proteins: 420,
            fat: 142,
            carbohydrates: 242,
            calories: 4242,
            price: 424,
            image: 'https://code.s3.yandex.net/react/code/meat-01.png',
            image_mobile:
              'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
            image_large:
              'https://code.s3.yandex.net/react/code/meat-01-large.png'
          },
          {
            id: '2',
            _id: '643d69a5c3f7b9001cfa0941',
            name: 'Биокотлета из марсианской Магнолии',
            type: 'main',
            proteins: 420,
            fat: 142,
            carbohydrates: 242,
            calories: 4242,
            price: 424,
            image: 'https://code.s3.yandex.net/react/code/meat-01.png',
            image_mobile:
              'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
            image_large:
              'https://code.s3.yandex.net/react/code/meat-01-large.png'
          }
        ],
        bun: null
      },
      orderRequest: false,
      orderModalData: null,
      loading: false,
      error: null
    };

    const newState = burgerConstructorSlicer(
      initialState,
      removeIngredient('1')
    );
    const ingredients = newState.constructorItems.ingredients;
    expect(ingredients.length).toBe(1);
    expect(ingredients[0].id).toBe('2');
  });
  it('экшен изменения порядка ингредиентов в начинке', () => {
    const initialState = {
      constructorItems: {
        ingredients: [
          {
            id: '1',
            _id: '643d69a5c3f7b9001cfa0941',
            name: 'Биокотлета из марсианской Магнолии',
            type: 'main',
            proteins: 420,
            fat: 142,
            carbohydrates: 242,
            calories: 4242,
            price: 424,
            image: 'https://code.s3.yandex.net/react/code/meat-01.png',
            image_mobile:
              'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
            image_large:
              'https://code.s3.yandex.net/react/code/meat-01-large.png'
          },
          {
            id: '2',
            _id: '643d69a5c3f7b9001cfa0941',
            name: 'Биокотлета из марсианской Магнолии',
            type: 'main',
            proteins: 420,
            fat: 142,
            carbohydrates: 242,
            calories: 4242,
            price: 424,
            image: 'https://code.s3.yandex.net/react/code/meat-01.png',
            image_mobile:
              'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
            image_large:
              'https://code.s3.yandex.net/react/code/meat-01-large.png'
          },
          {
            id: '3',
            _id: '643d69a5c3f7b9001cfa0941',
            name: 'Биокотлета из марсианской Магнолии',
            type: 'main',
            proteins: 420,
            fat: 142,
            carbohydrates: 242,
            calories: 4242,
            price: 424,
            image: 'https://code.s3.yandex.net/react/code/meat-01.png',
            image_mobile:
              'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
            image_large:
              'https://code.s3.yandex.net/react/code/meat-01-large.png'
          }
        ],
        bun: null
      },
      orderRequest: false,
      orderModalData: null,
      loading: false,
      error: null
    };
    const sorteredingredients = [
      {
        id: '3',
        _id: '643d69a5c3f7b9001cfa0941',
        name: 'Биокотлета из марсианской Магнолии',
        type: 'main',
        proteins: 420,
        fat: 142,
        carbohydrates: 242,
        calories: 4242,
        price: 424,
        image: 'https://code.s3.yandex.net/react/code/meat-01.png',
        image_mobile:
          'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png'
      },
      {
        id: '1',
        _id: '643d69a5c3f7b9001cfa0941',
        name: 'Биокотлета из марсианской Магнолии',
        type: 'main',
        proteins: 420,
        fat: 142,
        carbohydrates: 242,
        calories: 4242,
        price: 424,
        image: 'https://code.s3.yandex.net/react/code/meat-01.png',
        image_mobile:
          'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png'
      },
      {
        id: '2',
        _id: '643d69a5c3f7b9001cfa0941',
        name: 'Биокотлета из марсианской Магнолии',
        type: 'main',
        proteins: 420,
        fat: 142,
        carbohydrates: 242,
        calories: 4242,
        price: 424,
        image: 'https://code.s3.yandex.net/react/code/meat-01.png',
        image_mobile:
          'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png'
      }
    ];

    const newState = burgerConstructorSlicer(
      initialState,
      moveIngredient({ from: 2, to: 0 })
    );
    const ingredients = newState.constructorItems.ingredients;
    expect(ingredients).toEqual(sorteredingredients);
  });
});
