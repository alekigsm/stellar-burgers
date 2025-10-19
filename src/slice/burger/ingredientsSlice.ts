import { createSlice, createSelector } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';
import { getIngredients } from './actions';

type TIngredientsState = {
  ingredients: TIngredient[];
  loading: boolean;
  error: string | null;
};

const initialState: TIngredientsState = {
  ingredients: [],
  loading: false,
  error: null
};

export const ingredientsSlicer = createSlice({
  name: 'ingredients',
  initialState,
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
  selectors: {
    getIngredientsSelector: (state) => state.ingredients,
    getIngredientsLoading: (state) => state.loading,
    getIngredientsError: (state) => state.error
  },
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
        state.ingredients = action.payload;
      });
  }
});

// Базовые селекторы
export const {
  getIngredientsSelector,
  getIngredientsLoading,
  getIngredientsError
} = ingredientsSlicer.selectors;

// Мемоизированные селекторы с указанием типов
export const getIngredientsBun = createSelector(
  [getIngredientsSelector],
  (ingredients: TIngredient[]) =>
    ingredients.filter((item) => item.type === 'bun')
);

export const getIngredientsMain = createSelector(
  [getIngredientsSelector],
  (ingredients: TIngredient[]) =>
    ingredients.filter((item) => item.type === 'main')
);

export const getIngredientsSauce = createSelector(
  [getIngredientsSelector],
  (ingredients: TIngredient[]) =>
    ingredients.filter((item) => item.type === 'sauce')
);

export default ingredientsSlicer.reducer;
