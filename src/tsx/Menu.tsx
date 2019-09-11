import * as React from 'react';
import { useSpring, animated } from 'react-spring';
import styled from 'styled-components';

export interface IPosition {
  top: number,
  left: number
}

export interface IMenu {
  display: boolean,
  position: IPosition
}

const size = 20;
const menuWeight = 150;
const menuHeight = 90;

export const StyledMenu = styled(animated.div)(props => ({
  width: size,
  height: size,
  border: 'solid 1px red',
  position: 'fixed'
}));

export const Menu = (props: IMenu) => {
  const [show, setShow] = React.useState(false);

  const { x } = useSpring({ from: { x: 0 }, x: show ? 1 : 0 });

  const [position, setPosition] = useSpring(() => ({ xy: [0, 0], config: { mass: 1, tension: 200, friction: 20 } }));

  const trans1 = (x, y) => {
    return `translate3d(${x}px, ${y}px, 0)`;
  };

  React.useEffect(() => {
    setShow(props.display);
    console.log(props.position.top);
    setPosition({ xy: [props.position.left-5, props.position.top - 25] });
  }, [props]);

  const onClickLi = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShow(false);
  };

  return (
    <StyledMenu
      style={{
        opacity: x.interpolate({ range: [0, 1], output: [0, 1] }),
        width: x.interpolate({ range: [0, 1], output: [size, menuWeight] }),
        height: x.interpolate({ range: [0, 1], output: [size, menuHeight] }),
        //@ts-ignore
        transform: position.xy.interpolate(trans1)
      }}>
      <ul>
        <li onClick={onClickLi}>list 1</li>
        <li onClick={onClickLi}>list 2</li>
        <li onClick={onClickLi}>list 3</li>
      </ul>
    </StyledMenu>
  );
};
