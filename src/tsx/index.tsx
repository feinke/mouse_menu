import * as React from 'react';
import * as ReactDOM from 'react-dom';
import styled from 'styled-components';
import { Menu, IPosition } from './Menu';
import * as variables from '../_variables.scss';
import 'normalize.css';
import '../style.scss';
import { ContextProvider, AppContext } from './ContextProvider';

const dotSize: number = variables.dotSize;

const Wrapper = styled.div`
  position:relative;
  height:100%;
  width:100%;
`;


const MenuContainer = () => {

  const [menuPosition, setMenuPosition] = React.useState<IPosition>({ top: 0, left: 0 });
  const context = React.useContext(AppContext);

  const handleClick = (e: React.MouseEvent) => {
    e.persist();
    e.preventDefault();
    setMenuPosition({ top: e.clientY, left: e.clientX });
    context.toggleMenu(true);
  }

  const handleMouseMove = (clientX: number, clientY: number) => {
    if (!context.isMenuOpen) {
      setMenuPosition({ top: clientY, left: clientX });
    }
  }

  return (
    <>
      <Wrapper onClick={handleClick} onMouseMove={({ clientX, clientY }) => { handleMouseMove(clientX, clientY) }}>
        <Menu position={menuPosition} />
      </Wrapper>
    </>
  )
}

const App = () => {
  return (
    <>
      <ContextProvider>
        <MenuContainer />
      </ContextProvider>
    </>
  )
}

ReactDOM.render(<App />, document.getElementById('root'));