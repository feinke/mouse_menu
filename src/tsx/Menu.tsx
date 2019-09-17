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
  zIndex: 999,
  'will-change': 'transform'
}));

export const Menu = (props: IMenu) => {
  const scaleSize = {
    on: 1,
    off: 0.1
  }

  const context = React.useContext(AppContext);
  const menuRef = React.useRef();
  //@ts-ignore
  const { x } = useSpring({ ref: menuRef, from: { x: 0 }, to: { x: context.isMenuOpen ? 1 : 0 } });
  const [position, setPosition] = useSpring(() => ({ xy: [0, 0], config: { mass: 1, tension: 200, friction: 20 } }));
  const [scale, setScale] = useSpring(() => ({ size: scaleSize.off }));

  const trans1 = (x, y) => {
    return `translate3d(${x}px, ${y}px, 0)`;
  };

  const calculateOffsetPointer = (position: IPosition) => {
    return [
      position.left - menuWidth * 0.5, position.top - menuHeight * 0.5
    ]
  }

  const onClickMenu = (e:React.MouseEvent) => {
    // e.stopPropagation();
    context.toggleMenu(true);
  }

  React.useEffect(() => {
    setPosition({ xy: calculateOffsetPointer(props.position) });
  }, [props]);

  React.useEffect(()=>{
    if(context.isMenuOpen) {
      setScale({ size: scaleSize.on });
    }
    else {
      setScale({ size: scaleSize.off });
    }
  }, [context.isMenuOpen])

  return (
    <StyledMenu
      draggable={true}
      onClick={onClickMenu}
      style={{
        transform: interpolate([
          //@ts-ignore
          position.xy.interpolate(trans1),
          scale.size.interpolate(size => `scale(${size})`)
        ],
          (pos, scale) => `${pos} ${scale}`)
      }}>
      <MenuItem menuRef={menuRef} />
    </StyledMenu>
  );
};
