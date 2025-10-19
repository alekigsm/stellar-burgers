import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';

import {
  getOrdersLoading,
  selectorOrderByNumber,
  selectorOrders
} from '../../slice/order/orderSlice';
import { Preloader } from '@ui';
import { getOrders } from '../../slice/order/actions';
import { useDispatch, useSelector } from '../../services/store';

export const ProfileOrders: FC = () => {
  /** TODO: взять переменную из стора */
  const dispatch = useDispatch();
  const orders: TOrder[] = useSelector(selectorOrders);
  const loading = useSelector(getOrdersLoading);
  useEffect(() => {
    // Загружаем заказы при монтировании компонента
    dispatch(getOrders());
  }, [dispatch]);

  if (loading) {
    return <Preloader />;
  }

  return <ProfileOrdersUI orders={orders} />;
};
