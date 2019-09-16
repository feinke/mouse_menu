import * as React from 'react';
import * as ReactDOM from 'react-dom';
import 'normalize.css';
import '../style.scss';
import { ContextProvider } from './ContextProvider';
import { MenuContainer } from './MenuContainer';

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