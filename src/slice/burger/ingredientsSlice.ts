import { createSlice, PayloadAction } from '@reduxjs/toolkit';
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
  //синхронные экшены
  reducers: {
    addIngredient: (state, action: PayloadAction<TIngredient>) => {
      state.ingredients.push(action.payload);
    },
    removeIngredient: (state, action: PayloadAction<string>) => {
      state.ingredients = state.ingredients.filter(
        (b) => b._id !== action.payload
      );
    }
  },
  //селекторы состояния
  selectors: {
    getIngredientsSelector: (state) => state.ingredients, // Только массив ингредиентов
    getIngredientsLoading: (state) => state.loading,
    getIngredientsError: (state) => state.error,
    // Можно добавить больше селекторов
    getIngredientsBun: (state) =>
      state.ingredients.filter((item) => item.type === 'bun'),
    getIngredientsMain: (state) =>
      state.ingredients.filter((item) => item.type === 'main'),
    getIngredientsSauce: (state) =>
      state.ingredients.filter((item) => item.type === 'sauce')
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
        state.ingredients = action.payload;
      });
  }
});

//export const { addIngredient, removeIngredient } = ingredientsSlicer.actions;
export const {
  getIngredientsSelector,
  getIngredientsLoading,
  getIngredientsError,

  getIngredientsBun,
  getIngredientsMain,
  getIngredientsSauce
} = ingredientsSlicer.selectors;

export default ingredientsSlicer.reducer;
