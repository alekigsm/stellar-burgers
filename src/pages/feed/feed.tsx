import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { getFeed, getFeedsLoading } from '../../slice/feed/feedSlice';
import { getFeeds } from '../../slice/feed/actions';

export const Feed: FC = () => {
  /** TODO: взять переменную из стора */
  const dispatch = useDispatch();
  const { orders } = useSelector(getFeed);
  const loading = useSelector(getFeedsLoading);

  useEffect(() => {
    // Загружаем только если ингредиентов еще нет
    if (orders.length === 0 && !loading) {
      dispatch(getFeeds());
    }
  }, [dispatch, orders.length, loading]);
  console.log('вот ордеры', orders);

  if (!orders.length) {
    return <Preloader />;
  }

  return <FeedUI orders={orders} handleGetFeeds={() => {}} />;
};
