import React from 'react';
import ReactDOM from 'react-dom';
import { animated, useSpring, useTrail } from 'react-spring'
import styled, { createGlobalStyle } from 'styled-components';
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
}));

export const Main = () => {
  const onMouseMove = (clientX, clientY) => {
    setMouseTrail({ xy: [clientX, clientY] });
  }

  const [mouseTrail, setMouseTrail] = useTrail(1, () => ({ xy: [0, 0] }));
  const trans = (x, y) => `translate3d(${x-10}px, ${y-10}px, 0)`;

  return (
    <>
      <GlobalStyle />
      <Wrapper onMouseMove={({ clientX, clientY }) => { onMouseMove(clientX, clientY) }}>
        {mouseTrail.map((trail, index) => (
          <Dot
            key={index}
            style={{
              transform: trail.xy.interpolate(trans)
            }}
          />
        ))}
      </Wrapper>
    </>
  )
}

ReactDOM.render(<Main />, document.getElementById('root'));