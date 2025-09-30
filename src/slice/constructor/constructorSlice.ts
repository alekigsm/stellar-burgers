import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient } from '@utils-types';
import { getIngredients } from './actions';

type TConstructState = {
  ingredients: TConstructorIngredient[];
  bun: TConstructorIngredient | null;
};
const initialState: TConstructState = {
  ingredients: [],
  bun: null
};

export const burgerConstructorSlicer = createSlice({
  name: 'burgerConstructor',
  initialState,
  //синхронные экшены
  reducers: {
    addIngredient: (state, action: PayloadAction<TIngredient>) => {
      const ingredient = action.payload as TConstructorIngredient;
      ingredient.id = ingredient._id;
      state.ingredients.push(ingredient);
    },
    selectBun: (state, action: PayloadAction<TIngredient>) => {
      const ingredient = action.payload as TConstructorIngredient;
      ingredient.id = ingredient._id;
      state.bun = ingredient;
    },
    removeIngredient: (state, action: PayloadAction<string>) => {
      state.ingredients = state.ingredients.filter(
        (b) => b._id !== action.payload
      );
    }
  },
  //селекторы состояния
  selectors: {
    getBurgerConstructorSelector: (state) => state
  },
  //обработка асинхронных экшенов
  extraReducers: (builder) => {}
});

export const { addIngredient, removeIngredient, selectBun } =
  burgerConstructorSlicer.actions;
export const { getBurgerConstructorSelector } =
  burgerConstructorSlicer.selectors;
export default burgerConstructorSlicer.reducer;
