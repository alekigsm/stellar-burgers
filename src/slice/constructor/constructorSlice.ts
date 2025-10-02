import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient, TOrder } from '@utils-types';
import { getOrderBurger } from './actions';

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
    addIngredient: (state, action: PayloadAction<TIngredient>) => {
      const id = nanoid();
      if (action.payload.type === 'bun') {
        state.constructorItems.bun = { id, ...action.payload };
      } else {
        state.constructorItems.ingredients.push({ id, ...action.payload });
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
      const [movedItem] = state.constructorItems.ingredients.splice(from, 1);
      state.constructorItems.ingredients.splice(to, 0, movedItem);
    },
    clearConstructor: (state) => {
      state.constructorItems = {
        ingredients: [],
        bun: null
      };
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
      .addCase(getOrderBurger.pending, (state) => {
        state.loading = true;
        state.orderRequest = true;
      })
      .addCase(getOrderBurger.rejected, (state, action) => {
        state.loading = false;
        state.orderRequest = false;
        state.error = action.error.message ?? 'Ошибка при создании заказа';
      })
      .addCase(getOrderBurger.fulfilled, (state, action) => {
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
  clearConstructor
} = burgerConstructorSlicer.actions;

export const {
  getBurgerConstructorSelector,
  getBurgerConstructorOrderModalData,
  getBurgerConstructorOrderRequest,
  getBurgerConstructorLoading,
  getBurgerConstructorError
} = burgerConstructorSlicer.selectors;

export default burgerConstructorSlicer.reducer;
