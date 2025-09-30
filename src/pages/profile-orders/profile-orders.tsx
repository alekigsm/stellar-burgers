import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC } from 'react';
import { useSelector } from 'react-redux';
import { getOrders } from '../../slice/order/orderSlice';

export const ProfileOrders: FC = () => {
  /** TODO: взять переменную из стора */

  const orders: TOrder[] = useSelector(getOrders);

  return <ProfileOrdersUI orders={orders} />;
};
