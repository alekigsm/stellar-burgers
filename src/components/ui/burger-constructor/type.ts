import { TOrder } from '@utils-types';
import { ConnectDragSource } from 'react-dnd';

export type BurgerConstructorUIProps = {
  constructorItems: any;
  orderRequest: boolean;
  price: number;
  orderModalData: TOrder | null;
  onOrderClick: () => void;
  closeOrderModal: () => void;
  onRemoveIngredient: (id: string) => void;
};
