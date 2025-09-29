import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TConstructorIngredient } from '@utils-types';
import { getIngredients } from './actions';

type TConstructState = {
  ingredients: TConstructorIngredient[];
  bun: TConstructorIngredient | null;
  loading: boolean;
  error: string | null;
};
const initialState: TConstructState = {
  ingredients: [],
  bun: null,
  loading: false,
  error: null
};

export const constructorsSlicer = createSlice({
  name: 'constructors',
  initialState,
  //синхронные экшены
  reducers: {
    /*    addIngredient: (state, action: PayloadAction<TIngredient>) => {
      state.ingredients.push(action.payload);
    },
    removeIngredient: (state, action: PayloadAction<string>) => {
      state.ingredients = state.ingredients.filter(
        (b) => b._id !== action.payload
      );
    } */
  },
  //селекторы состояния
  selectors: {
    getIngredientsSelector: (state) => state
  },
  //обработка асинхронных экшенов
  extraReducers: (builder) => {
    builder
      .addCase(getIngredients.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getIngredients.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? null;
      })
      .addCase(getIngredients.fulfilled, (state, action) => {
        state.loading = false;
      });
  }
});

//export const { addIngredient, removeIngredient } = ingredientsSlicer.actions;
export const { getIngredientsSelector } = constructorsSlicer.selectors;
export default constructorsSlicer.reducer;
