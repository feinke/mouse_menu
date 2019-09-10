import * as React from "react";
import * as ReactDOM from "react-dom";
import styled, { createGlobalStyle } from "styled-components";
import { Menu, IMenu, IPosition } from "./Menu";
import { useSpring, animated, useTrail } from "react-spring";

const GlobalStyle = createGlobalStyle`
  html, body, #root {
    font-family:Arial, sans-serif;
    width:100%;
    height:100%;
    margin:0;
    padding:0;
  }
`;

const Wrapper = styled.div`
  position:relative;
  background: #fff;
  height:100%;
  width:100%;
  border: solid 1px #000;
`;

const Dot = styled(animated.div)(props => ({
  position: 'absolute',
  width: '20px',
  height: '20px',
  background: '#5EBF9B',
  // transform: 'all 1s ease'
}));


const MenuContainer = () => {
  const config = { mass: 10, tension: 10, friction: 10 };
  const trans = (x, y) => `translate3d(${x - 10}px, ${y - 10}px, 0)`;

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
    setMouseTrail({ xy: [clientX, clientY] });
    // setDotPosition({ top: y, left: x });
  }

  return (
    <>
      <GlobalStyle />
      <Wrapper onClick={handleClick} onMouseMove={({ clientX, clientY }) => { handleMouseMove(clientX, clientY)}}>
        {mouseTrail.map((trail, index) => (
          <Dot
            key={index}
            style={{
              //@ts-ignore
              transform: trail.xy.interpolate(trans)
            }}
          />
        ))}
        huhuh
        <Menu display={showMenu} position={menuPosition} />
      </Wrapper>
    </>
  )
}

ReactDOM.render(<MenuContainer />, document.getElementById('root'));