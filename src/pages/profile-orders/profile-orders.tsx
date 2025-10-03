import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC } from 'react';
import { useSelector } from 'react-redux';
import { selectorOrders } from '../../slice/order/orderSlice';

export const ProfileOrders: FC = () => {
  /** TODO: взять переменную из стора */

  const orders: TOrder[] = useSelector(selectorOrders);

  return <ProfileOrdersUI orders={orders} />;
};
