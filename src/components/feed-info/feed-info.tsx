import { FC, useEffect } from 'react';
import { TOrder } from '@utils-types';
import { FeedInfoUI } from '../ui/feed-info';
import { getFeed, setFeeds } from '../../slice/feed/feedSlice';
import { useDispatch, useSelector } from '../../services/store';
import { getFeeds } from '../../slice/feed/actions';

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
  /*  const dispatch = useDispatch();
  const setTimeFeeds = () => {
    setTimeout(() => {
      dispatch(getFeeds());
      //setTimeFeeds();
    }, 5000);
  };
  setTimeFeeds(); */
  return (
    <FeedInfoUI
      readyOrders={readyOrders}
      pendingOrders={pendingOrders}
      feed={feed}
    />
  );
};
