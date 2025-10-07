import { FC, useEffect } from 'react';
import { TOrder } from '@utils-types';
import { FeedInfoUI } from '../ui/feed-info';
import { getFeed, setFeeds } from '../../slice/feed/feedSlice';
import { useSelector } from '../../services/store';

const getOrders = (orders: TOrder[], status: string): number[] =>
  orders
    .filter((item) => item.status === status)
    .map((item) => item.number)
    .slice(0, 20);

export const FeedInfo: FC = () => {
  /** TODO: взять переменные из стора */
  const feed = useSelector(getFeed);
  const orders = feed.orders;
  const readyOrders = getOrders(orders, 'done');
  const pendingOrders = getOrders(orders, 'pending');

  /*   console.log('FeedInfo - feed:', feed);
  console.log('FeedInfo - orders:', orders);
  console.log('FeedInfo - readyOrders:', readyOrders);
  console.log('FeedInfo - pendingOrders:', pendingOrders); */
  return (
    <FeedInfoUI
      readyOrders={readyOrders}
      pendingOrders={pendingOrders}
      feed={feed}
    />
  );
};
