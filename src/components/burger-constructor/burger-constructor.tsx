import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useDispatch, useSelector } from 'react-redux';
import {
  getBurgerConstructorOrderModalData,
  getBurgerConstructorOrderRequest,
  getBurgerConstructorSelector,
  removeIngredient
} from '../../slice/constructor/constructorSlice';

export const BurgerConstructor: FC = () => {
  /** TODO: взять переменные constructorItems,
   * orderRequest и orderModalData из стора */
  const dispatch = useDispatch();
  const constructorItems = useSelector(getBurgerConstructorSelector);
  const orderModalData = useSelector(getBurgerConstructorOrderModalData);
  const orderRequest = useSelector(getBurgerConstructorOrderRequest);
  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;
  };
  const closeOrderModal = () => {};

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
