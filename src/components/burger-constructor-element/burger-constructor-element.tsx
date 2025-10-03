import { FC, memo } from 'react';
import { BurgerConstructorElementUI } from '@ui';
import { BurgerConstructorElementProps } from './type';
import { moveIngredient } from '../../slice/constructor/constructorSlice';
import { useDispatch } from 'react-redux';

export const BurgerConstructorElement: FC<BurgerConstructorElementProps> = memo(
  ({ ingredient, index, totalItems, onRemove }) => {
    const dispatch = useDispatch();
    const handleMoveDown = () => {
      console.log('Down');
      if (index == totalItems - 1 || ingredient.type == 'bun') return;
      dispatch(moveIngredient({ from: index, to: index + 1 }));
    };

    const handleMoveUp = () => {
      console.log('up');
      if (index == 0 || ingredient.type == 'bun') return;
      dispatch(moveIngredient({ from: index, to: index - 1 }));
    };

    const handleClose = () => {
      onRemove(ingredient.id);
    };
    return (
      <BurgerConstructorElementUI
        ingredient={ingredient}
        index={index}
        totalItems={totalItems}
        handleMoveUp={handleMoveUp}
        handleMoveDown={handleMoveDown}
        handleClose={handleClose}
      />
    );
  }
);
