import { FC, useEffect, useMemo } from 'react';
import { Preloader } from '../ui/preloader';
import { OrderInfoUI } from '../ui/order-info';
import { TIngredient } from '@utils-types';
import { getIngredientsSelector } from '../../slice/burger/ingredientsSlice';
import { selectorOrderByNumber } from '../../slice/order/orderSlice';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from '../../services/store';
import { getOrderByNumber } from '../../slice/order/actions';

export const OrderInfo: FC = () => {
  /** TODO: взять переменные orderData и ingredients из стора */
  const ingredients = useSelector(getIngredientsSelector);
  const orders = useSelector(selectorOrderByNumber);
  const { number } = useParams();
  // Находим заказ по номеру
  const orderData = orders.find((item) => item.number === Number(number));
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getOrderByNumber(Number(number)));
  }, [dispatch]);

  /* Готовим данные для отображения */
  const orderInfo = useMemo(() => {
    if (!orderData || !ingredients.length) return null;
    const date = new Date(orderData.createdAt);
    type TIngredientsWithCount = {
      [key: string]: TIngredient & { count: number };
    };

    const ingredientsInfo = orderData.ingredients.reduce(
      (acc: TIngredientsWithCount, item) => {
        if (!acc[item]) {
          const ingredient = ingredients.find((ing) => ing._id === item);
          if (ingredient) {
            acc[item] = {
              ...ingredient,
              count: 1
            };
          }
        } else {
          acc[item].count++;
        }

        return acc;
      },
      {}
    );

    const total = Object.values(ingredientsInfo).reduce(
      (acc, item) => acc + item.price * item.count,
      0
    );

    return {
      ...orderData,
      ingredientsInfo,
      date,
      total
    };
  }, [orderData, ingredients]);

  if (!orderInfo) {
    return <Preloader />;
  }

  return <OrderInfoUI orderInfo={orderInfo} />;
};
