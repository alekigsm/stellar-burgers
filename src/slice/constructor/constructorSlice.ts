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
  //синхронные экшены
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
          (b) => b._id !== action.payload
        );
    }
  },
  //селекторы состояния
  selectors: {
    getBurgerConstructorSelector: (state) => state
  },
  //обработка асинхронных экшенов
  extraReducers: (builder) => {
    builder
      .addCase(getOrderBurger.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getOrderBurger.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? 'Ошибка при загрузке ленты';
      })
      .addCase(getOrderBurger.fulfilled, (state, action) => {
        state.loading = false;
        state.orderModalData = action.payload.order;
        state.orderRequest = action.payload.success;
      });
  }
});

export const { addIngredient, removeIngredient } =
  burgerConstructorSlicer.actions;
export const { getBurgerConstructorSelector } =
  burgerConstructorSlicer.selectors;
export default burgerConstructorSlicer.reducer;
