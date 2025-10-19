import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient, TOrder } from '@utils-types';
import { orderBurger } from './actions';

type TConstructState = {
  constructorItems: {
    ingredients: TConstructorIngredient[];
    bun: TConstructorIngredient | null;
  };
  orderRequest: boolean;
  orderModalData: TOrder | null;
  loading: boolean;
  error: string | null;
};

const initialState: TConstructState = {
  constructorItems: {
    ingredients: [],
    bun: null
  },
  orderRequest: false,
  orderModalData: null,
  loading: false,
  error: null
};

export const burgerConstructorSlicer = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    addIngredient: {
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
        if (action.payload.type === 'bun') {
          state.constructorItems.bun = action.payload;
        } else {
          state.constructorItems.ingredients.push(action.payload);
        }
      },
      prepare: (ingredient: TIngredient) => {
        const id = nanoid();
        return { payload: { id, ...ingredient } };
      }
    },

    removeIngredient: (state, action: PayloadAction<string>) => {
      state.constructorItems.ingredients =
        state.constructorItems.ingredients.filter(
          (item) => item.id !== action.payload
        );
    },

    moveIngredient: (
      state,
      action: PayloadAction<{ from: number; to: number }>
    ) => {
      const { from, to } = action.payload;
      const ingredients = state.constructorItems.ingredients;

      // Проверяем валидность индексов
      if (
        from < 0 ||
        from >= ingredients.length ||
        to < 0 ||
        to > ingredients.length
      ) {
        console.error('Некорректные индексы:', from, to);
        return;
      }

      // Если перемещение на ту же позицию - выходим
      if (from === to) {
        console.log('Перемещен:');
        return;
      }

      const newIngredients = [...ingredients];
      const [movedItem] = newIngredients.splice(from, 1);
      newIngredients.splice(to, 0, movedItem);

      state.constructorItems.ingredients = newIngredients;

      console.log('Перемещен:', movedItem.name);
      console.log(
        'Новый порядок:',
        newIngredients.map((item) => item.name)
      );
    },
    clearConstructor: (state) => {
      state.constructorItems = {
        ingredients: [],
        bun: null
      };
    },
    resetOrderRequest: (state) => {
      state.orderRequest = false;
    },
    resetOrderModalData: (state) => {
      state.orderModalData = null;
    }
  },
  selectors: {
    getBurgerConstructorSelector: (state) => state.constructorItems,
    getBurgerConstructorOrderModalData: (state) => state.orderModalData,
    getBurgerConstructorOrderRequest: (state) => state.orderRequest,
    getBurgerConstructorLoading: (state) => state.loading,
    getBurgerConstructorError: (state) => state.error
  },
  extraReducers: (builder) => {
    builder
      .addCase(orderBurger.pending, (state) => {
        state.loading = true;
        state.orderRequest = true;
      })
      .addCase(orderBurger.rejected, (state, action) => {
        state.loading = false;
        state.orderRequest = false;
        state.error = action.error.message ?? 'Ошибка при создании заказа';
      })
      .addCase(orderBurger.fulfilled, (state, action) => {
        state.loading = false;
        state.orderRequest = false;
        state.orderModalData = action.payload.order;
        state.constructorItems = {
          ingredients: [],
          bun: null
        };
      });
  }
});

export const {
  addIngredient,
  removeIngredient,
  moveIngredient,
  clearConstructor,
  resetOrderRequest,
  resetOrderModalData
} = burgerConstructorSlicer.actions;

export const {
  getBurgerConstructorSelector,
  getBurgerConstructorOrderModalData,
  getBurgerConstructorOrderRequest,
  getBurgerConstructorLoading,
  getBurgerConstructorError
} = burgerConstructorSlicer.selectors;

export default burgerConstructorSlicer.reducer;
