import { FC, useEffect } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { useDispatch, useSelector } from 'react-redux';
import { getIngredientsSelector } from '../../slice/burger/ingredientsSlice';
import { getIngredients } from '../../slice/burger/actions';
import { useParams } from 'react-router-dom';

export const IngredientDetails: FC = () => {
  const { id } = useParams<{ id: string }>();

  // Получаем все ингредиенты из стора
  const ingredients = useSelector(getIngredientsSelector);

  // Находим конкретный ингредиент по id
  const ingredientData = ingredients.find(
    (ingredient) => ingredient._id === id
  );

  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
