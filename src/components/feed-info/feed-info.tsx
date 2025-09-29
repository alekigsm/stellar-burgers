import { FC, useEffect } from 'react';
import { TOrder } from '@utils-types';
import { FeedInfoUI } from '../ui/feed-info';
import { useDispatch, useSelector } from 'react-redux';
import { getFeeds } from '../../slice/feed/feedSlice';
import { getFeed } from '../../slice/feed/actions'; // импортируй экшен

const getOrders = (orders: TOrder[], status: string): number[] =>
  orders
    .filter((item) => item.status === status)
    .map((item) => item.number)
    .slice(0, 20);

export const FeedInfo: FC = () => {
  const { orders, total, totalToday } = useSelector(getFeeds);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFeed() as any);
  }, [dispatch]);

  /** TODO: взять переменные из стора */
  const feed = {
    total,
    totalToday
  };
  const readyOrders = getOrders(orders, 'done');

  const pendingOrders = getOrders(orders, 'pending');

  return (
    <FeedInfoUI
      readyOrders={readyOrders}
      pendingOrders={pendingOrders}
      feed={feed}
    />
  );
};
