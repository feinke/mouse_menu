import * as React from 'react';
import styled from 'styled-components';
import { Menu, IPosition } from './Menu';
import { AppContext } from './ContextProvider';
import { animated, useSpring, interpolate } from 'react-spring';

const Wrapper = styled.div`
  position:relative;
  height:100%;
  width:100%;
`;

export const MenuContainer = () => {

  const [menuPosition, setMenuPosition] = React.useState<IPosition>({ top: 0, left: 0 });
  const [currentMenuPosition, setCurrentMenuPosition] = React.useState<IPosition>({ top: 0, left: 0 });


  const [position, setPosition] = useSpring(() => ({ x: 0, y: 0 }));

  const transf = (x, y) => {
    return `translate(${x}px, ${y}px)`
  }

  const context = React.useContext(AppContext);
  const handleClick = (e: React.MouseEvent) => {
    // e.persist();
    // e.preventDefault();
    // setMenuPosition({ top: e.clientY, left: e.clientX });
    // context.toggleMenu(false);
  };

  const handleMouseMove = (clientX: number, clientY: number) => {
    if (!context.isMenuOpen) {
      setMenuPosition({ top: clientY, left: clientX });
    }
  };

  React.useLayoutEffect(() => {
    const parent = document.getElementById(context.currentMenu).parentElement.getBoundingClientRect();
    const position = document.getElementById(context.currentMenu).getBoundingClientRect();
    const x = parent.left - position.left;
    const y = parent.top - position.top;
    // setPosition({
    //   x: x,
    //   y: y,
    //   reset: true,
    //   from: { x: window.scrollX, y: window.scrollY },
    //   //@ts-ignore
    //   onFrame: props => window.scroll(props.x, props.y)
    // })
    setPosition({x, y});
  }, [context.currentMenu]);

  return (
    <>
      <Wrapper onClick={handleClick} onMouseMove={({ clientX, clientY }) => { handleMouseMove(clientX, clientY); }}>
        <Menu position={menuPosition} />
        <animated.div className='grid-container'
          style={{
            //@ts-ignore
            //transform: position.xy.interpolate(transf)
            transform: interpolate([
              //@ts-ignore
              position.x.interpolate(x => `${x}`),
              //@ts-ignore
              position.y.interpolate(y => `${y}`)
            ], transf)
          }}
        >
          {
            Array(9).fill('item').map((v, i) => (
              <div id={'item' + i} key={i} className={context.currentMenu === 'item' + i ? "active" : ""}>
                {i}
                <a href="http://google.com" target="_blank">test</a>
              </div>
            ))
          }
        </animated.div>
      </Wrapper>
    </>
  );
};
