import * as React from 'react';
import styled from 'styled-components';
import { Menu, IPosition } from './Menu';
import { AppContext } from './ContextProvider';

const Wrapper = styled.div`
  position:relative;
  height:100%;
  width:100%;
`;

export const MenuContainer = () => {

  const [menuPosition, setMenuPosition] = React.useState<IPosition>({ top: 0, left: 0 });
  const context = React.useContext(AppContext);
  const handleClick = (e: React.MouseEvent) => {
    e.persist();
    e.preventDefault();
    setMenuPosition({ top: e.clientY, left: e.clientX });
    context.toggleMenu(false);
  };
  const handleMouseMove = (clientX: number, clientY: number) => {
    if (!context.isMenuOpen) {
      setMenuPosition({ top: clientY, left: clientX });
    }
  };
  return (
    <>
      <Wrapper onClick={handleClick} onMouseMove={({ clientX, clientY }) => { handleMouseMove(clientX, clientY); }}>
        <Menu position={menuPosition} />
        at: {context.currentMenu}
      </Wrapper>
    </>
  );
};
