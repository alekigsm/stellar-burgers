import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC } from 'react';
import { useSelector } from 'react-redux';
import { getOrders } from '../../slice/order/orderSlice';

export const Feed: FC = () => {
  /** TODO: взять переменную из стора */

  const orders: TOrder[] = useSelector(getOrders);
  console.log('вот ордеры', orders);
  if (!orders.length) {
    return <Preloader />;
  }

  <FeedUI orders={orders} handleGetFeeds={() => {}} />;
};
