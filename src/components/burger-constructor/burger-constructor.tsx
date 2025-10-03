import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import {
  getBurgerConstructorOrderModalData,
  getBurgerConstructorOrderRequest,
  getBurgerConstructorSelector,
  removeIngredient,
  resetOrderModalData,
  resetOrderRequest
} from '../../slice/constructor/constructorSlice';
import { getUserData } from '../../slice/user/userSlice';
import { useNavigate } from 'react-router-dom';
import { orderBurger } from '../../slice/constructor/actions';
import { useDispatch, useSelector } from '../../services/store';

export const BurgerConstructor: FC = () => {
  /** TODO: взять переменные constructorItems,
   * orderRequest и orderModalData из стора */
  const dispatch = useDispatch();
  const constructorItems = useSelector(getBurgerConstructorSelector);
  const orderModalData = useSelector(getBurgerConstructorOrderModalData);
  const orderRequest = useSelector(getBurgerConstructorOrderRequest);
  const user = useSelector(getUserData);
  const navigate = useNavigate();

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;
    if (user) {
      const ids = constructorItems.ingredients.map((item) => item._id);
      const idBun = constructorItems.bun._id;
      dispatch(orderBurger([...ids, idBun]));
    } else {
      navigate('/login');
    }
  };

  const closeOrderModal = () => {
    if (orderRequest) dispatch(resetOrderRequest());
    if (orderModalData) dispatch(resetOrderModalData());
  };

  const handleRemoveIngredient = (id: string) => {
    dispatch(removeIngredient(id));
  };
  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
      onRemoveIngredient={handleRemoveIngredient}
    />
  );
};
