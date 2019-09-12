import * as React from 'react';


interface IAppContext {
  isMenuOpen: boolean,
  toggleMenu: (payload: boolean) => void
}

export const AppContext = React.createContext<IAppContext | null>(null);

export const ContextProvider = ({ children }) => {
  const [isMenuOpen, toggleMenu] = React.useState(false);
  const state: IAppContext = {
    isMenuOpen: isMenuOpen,
    toggleMenu: (payload: boolean) => {
      toggleMenu(payload)
    }
  }

  return (
    <AppContext.Provider value={state}>
      {children}
    </AppContext.Provider>
  )
}