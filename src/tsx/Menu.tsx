import * as React from 'react';
import { useSpring, animated, interpolate } from 'react-spring';
import styled from 'styled-components';
import * as variables from '../_variables.scss';
import { AppContext } from './ContextProvider';
import { MenuItem } from './MenuItem';

export interface IPosition {
  top: number,
  left: number
}

export interface IMenu {
  position: IPosition
}

const size = 20;
const menuWidth = 150;
const menuHeight = 90;

export const StyledMenu = styled(animated.div)(props => ({
  width: menuWidth,
  height: menuHeight,
  background: variables.minty,
  position: 'fixed',
  color: variables.dark,
  scale: 0.15,
}));

export const Menu = (props: IMenu) => {
  const context = React.useContext(AppContext);
  const { x } = useSpring({ from: { x: 0 }, x: context.isMenuOpen ? 1 : 0 });
  const [position, setPosition] = useSpring(() => ({ xy: [0, 0], config: { mass: 1, tension: 200, friction: 20 } }));

  const trans1 = (x, y) => {
    return `translate3d(${x}px, ${y}px, 0)`;
  };

  React.useEffect(() => {
    setPosition({ xy: calculateOffsetPointer(props.position) });
  }, [props]);

  const onClickLi = (e: React.MouseEvent) => {
    e.stopPropagation();
    context.toggleMenu(false);
  };

  const calculateOffsetPointer = (position: IPosition) => {
    return [
      position.left - menuWidth * 0.5, position.top - menuHeight * 0.5
    ]
  }

  return (
    <StyledMenu
      onClick={() => context.toggleMenu(true) }
      style={{
        transform: interpolate([
          //@ts-ignore
          position.xy.interpolate(trans1),
          x.interpolate({
            range: [0, 1],
            output: [0.1, 1]
          }).interpolate(x => `scale(${x})`)
        ],
          (pos, scale) => `${pos} ${scale}`)
      }}>
      <MenuItem />
    </StyledMenu>
  );
};
