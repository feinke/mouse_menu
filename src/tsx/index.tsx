import * as React from 'react';
import * as ReactDOM from 'react-dom';
import styled from 'styled-components';
import { Menu, IMenu, IPosition } from './Menu';
import { useSpring, animated, useTrail } from 'react-spring';
import * as variables from '../_variables.scss';
import 'normalize.css';
import '../style.scss';

const Wrapper = styled.div`
  position:relative;
  height:100%;
  width:100%;
`;

const Dot = styled(animated.div)(props => ({
  position: 'fixed',
  width: variables.dotSize + 'px',
  height: variables.dotSize + 'px',
  background: variables.minty,
}));

const DotMenu = styled(animated.div)(props => ({
  position: 'fixed',
  width: variables.dotSize + 'px',
  height: variables.dotSize + 'px',
  background: variables.purple,
}));


const MenuContainer = () => {
  // const config = { mass: 1, tension: 300, friction: 26 };
  const trans = (x, y) => `translate3d(${x - variables.dotSize * 0.5}px, ${y - variables.dotSize * 0.5}px, 0)`;

  const [menuPosition, setMenuPosition] = React.useState<IPosition>({ top: 0, left: 0 });
  const [showMenu, setShowMenu] = React.useState(false);
  const [mouseTrail, setMouseTrail] = useTrail(1, () => ({ xy: [0, 0] }));

  const handleClick = (e: React.MouseEvent) => {
    e.persist();
    e.preventDefault();
    const x: number = e.clientX;
    const y: number = e.clientY;
    setMenuPosition({ top: y, left: x });
    setShowMenu(true);
  }

  const handleMouseMove = (clientX: number, clientY: number) => {
      //@ts-ignore
      setMouseTrail({ xy: [clientX, clientY] });
  }

  return (
    <>
      <Wrapper onClick={handleClick} onMouseMove={({ clientX, clientY }) => { handleMouseMove(clientX, clientY)}}>
        {mouseTrail.map((trail, index) => (
          <>
            <Dot
              key={index}
              style={{
                //@ts-ignore
                transform: trail.xy.interpolate(trans)
              }}
            />
            <DotMenu key={index}
              style={{
                //@ts-ignore
                transform: trail.xy.interpolate(trans)
              }} 
            />
          </>
        ))}
        Click
        <Menu display={showMenu} position={menuPosition} />
      </Wrapper>
    </>
  )
}

ReactDOM.render(<MenuContainer />, document.getElementById('root'));