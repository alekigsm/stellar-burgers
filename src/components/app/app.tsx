import {
  ConstructorPage,
  Feed,
  ForgotPassword,
  Login,
  NotFound404,
  Profile,
  ProfileOrders,
  Register,
  ResetPassword
} from '@pages';
import '../../index.css';
import styles from './app.module.css';

import { AppHeader, IngredientDetails, Modal, OrderInfo } from '@components';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { ProtectedRoute } from '../protected-route';
import { useEffect } from 'react';
import { getUser } from '../../slice/user/actions';
import { useDispatch, useSelector } from '../../services/store';
import { getIngredients } from '../../slice/burger/actions';
import {
  getIngredientsLoading,
  getIngredientsSelector
} from '../../slice/burger/ingredientsSlice';
const App = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const backgroundLocation = location.state?.background;
  const ingredients = useSelector(getIngredientsSelector);
  const loading = useSelector(getIngredientsLoading);
  const handleCloseModal = () => {
    navigate(-1);
  };
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUser());
  }, []);

  useEffect(() => {
    // Загружаем только если ингредиентов еще нет
    if (ingredients.length === 0 && !loading) {
      dispatch(getIngredients());
    }
  }, [dispatch, ingredients.length, loading]);
  /*   const url = 'wss://norma.nomoreparties.space/api';
  const websocket = new WebSocket(url);

  // когда WebSocket-соединение успешно откроется,
  websocket.addEventListener('message', (ev) => {
    // отправим серверу приветственное сообщение
    //websocket.send('say hi to server!');

    console.log(ev);
  }); */
  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes location={backgroundLocation || location}>
        {/* Основные роуты */}
        <Route path='/' element={<ConstructorPage />} />
        <Route path='/feed' element={<Feed />} />
        <Route path='/feed/:number' element={<OrderInfo />} />
        <Route path='/ingredients/:id' element={<IngredientDetails />} />

        {/* Защищённые для неавторизованных */}
        <Route
          path='/login'
          element={
            <ProtectedRoute onlyUnAuth>
              <Login />
            </ProtectedRoute>
          }
        />
        <Route
          path='/register'
          element={
            <ProtectedRoute onlyUnAuth>
              <Register />
            </ProtectedRoute>
          }
        />
        <Route
          path='/forgot-password'
          element={
            <ProtectedRoute onlyUnAuth>
              <ForgotPassword />
            </ProtectedRoute>
          }
        />
        <Route
          path='/reset-password'
          element={
            <ProtectedRoute onlyUnAuth>
              <ResetPassword />
            </ProtectedRoute>
          }
        />

        {/* Защищённые для авторизованных */}
        <Route
          path='/profile'
          element={
            <ProtectedRoute onlyUnAuth={false}>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path='/profile/orders'
          element={
            <ProtectedRoute onlyUnAuth={false}>
              <ProfileOrders />
            </ProtectedRoute>
          }
        />
        <Route
          path='/profile/orders/:number'
          element={
            <ProtectedRoute onlyUnAuth={false}>
              <OrderInfo />
            </ProtectedRoute>
          }
        />

        <Route path='*' element={<NotFound404 />} />
      </Routes>

      {/* Модалки */}
      {backgroundLocation && (
        <Routes>
          <Route
            path='/feed/:number'
            element={
              <Modal title='Детали заказа' onClose={handleCloseModal}>
                <OrderInfo />
              </Modal>
            }
          />
          <Route
            path='/ingredients/:id'
            element={
              <Modal title='Детали ингредиента' onClose={handleCloseModal}>
                <IngredientDetails />
              </Modal>
            }
          />
          <Route
            path='/profile/orders/:number'
            element={
              <ProtectedRoute onlyUnAuth={false}>
                <Modal title='Детали заказа' onClose={handleCloseModal}>
                  <OrderInfo />
                </Modal>
              </ProtectedRoute>
            }
          />
        </Routes>
      )}
    </div>
  );
};
export default App;
