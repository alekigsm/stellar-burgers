import { useState, useRef, useEffect, FC } from 'react';
import { useInView } from 'react-intersection-observer';

import { TTabMode } from '@utils-types';
import { BurgerIngredientsUI } from '../ui/burger-ingredients';
import { useDispatch, useSelector } from 'react-redux';
import {
  getIngredientsBun,
  getIngredientsError,
  getIngredientsLoading,
  getIngredientsMain,
  getIngredientsSauce,
  getIngredientsSelector
} from '../../slice/burger/ingredientsSlice';
import { Preloader } from '@ui';
import { getIngredients } from '../../slice/burger/actions';

export const BurgerIngredients: FC = () => {
  /** TODO: взять переменные из стора */

  const ingredients = useSelector(getIngredientsSelector);
  const loading = useSelector(getIngredientsLoading);
  const error = useSelector(getIngredientsError);
  const buns = useSelector(getIngredientsBun);
  const mains = useSelector(getIngredientsMain);
  const sauces = useSelector(getIngredientsSauce);
  const dispatch = useDispatch();

  useEffect(() => {
    // Загружаем только если ингредиентов еще нет
    if (ingredients.length === 0 && !loading) {
      dispatch(getIngredients() as any);
    }
  }, [dispatch, ingredients.length, loading]);
  const [currentTab, setCurrentTab] = useState<TTabMode>('bun');
  const titleBunRef = useRef<HTMLHeadingElement>(null);
  const titleMainRef = useRef<HTMLHeadingElement>(null);
  const titleSaucesRef = useRef<HTMLHeadingElement>(null);

  const [bunsRef, inViewBuns] = useInView({
    threshold: 0
  });

  const [mainsRef, inViewFilling] = useInView({
    threshold: 0
  });

  const [saucesRef, inViewSauces] = useInView({
    threshold: 0
  });

  useEffect(() => {
    if (inViewBuns) {
      setCurrentTab('bun');
    } else if (inViewSauces) {
      setCurrentTab('sauce');
    } else if (inViewFilling) {
      setCurrentTab('main');
    }
  }, [inViewBuns, inViewFilling, inViewSauces]);

  const onTabClick = (tab: string) => {
    setCurrentTab(tab as TTabMode);
    if (tab === 'bun')
      titleBunRef.current?.scrollIntoView({ behavior: 'smooth' });
    if (tab === 'main')
      titleMainRef.current?.scrollIntoView({ behavior: 'smooth' });
    if (tab === 'sauce')
      titleSaucesRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  if (loading) {
    return <Preloader />;
  }

  if (!loading && error) {
    return <p className='error'>Запрос завершился с ошибкой: {error}</p>;
  }

  if (!loading && ingredients.length === 0) {
    return <p className='message'>Нет ни одной книги</p>;
  }
  return (
    <BurgerIngredientsUI
      currentTab={currentTab}
      buns={buns}
      mains={mains}
      sauces={sauces}
      titleBunRef={titleBunRef}
      titleMainRef={titleMainRef}
      titleSaucesRef={titleSaucesRef}
      bunsRef={bunsRef}
      mainsRef={mainsRef}
      saucesRef={saucesRef}
      onTabClick={onTabClick}
    />
  );
};
