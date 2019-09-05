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

export const StyledMenu = styled(animated.div)(props => ({
  width: '300px',
  border: 'solid 1px red',
  position: 'fixed',
  // transform: `translate(${props.left}, ${props.top})`,
  transformOrigin: '0 0'
}));

export const Menu = (props: IMenu) => {
  const [show, setShow] = React.useState(false);
  // const [position, setPosition] = React.useState({ top: props.position.top, left: props.position.left });

  // const showMenu = useSpring({
  //   to: async (next, cancel) => {
  //     await next({ display: show ? 'block' : 'none' })
  //     await next({
  //       opacity: show ? 1 : 0,
  //       transform: show ?
  //         `translate(${props.position.left}, ${props.position.top})` :
  //         `translate(${position.left}, ${position.top})`
  //     })
  //   },
  //   from: { opacity: 0, display: 'none', transform: 'translate(0,0)' }
  // });

  const { x } = useSpring({ from: { x: 0 }, x: show ? 1 : 0 });

  const [position, setPosition] = useSpring(() => ({ xy: [0, 0], config: {} }));

  const trans1 = (x,y) => {
    // console.log(params);
    return `translate3d(${x}px, ${y}px, 0)`;
  };

  React.useEffect(() => {
    setShow(props.display);
    // console.log(props.position);

    setPosition({ xy: [props.position.left, props.position.top] });
  }, [props]);

  React.useEffect(() => {
    // console.log(position);

  }, [position]);

  const onClickLi = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShow(false);
  };

  return (
    <StyledMenu
      style={{
        opacity: x.interpolate({ range: [0, 1], output: [0, 1] }),
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
