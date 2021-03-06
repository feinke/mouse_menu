import * as React from 'react';

interface IAppContext {
  isMenuOpen: boolean,
  toggleMenu: (payload: boolean) => void,
  currentMenu: string,
  setCurrentMenu: (payload: string) => void
}

export interface IMenuData {
  name: string,
  link: string,
  close?: boolean
}

export const MenuData: IMenuData[] = [
  {
    name: 'item 1',
    link: 'item1'
  },
  {
    name: 'item 6',
    link: 'item6'
  },
  {
    name: 'close',
    link: '#close',
    close: true
  }
]

export const AppContext = React.createContext<IAppContext | null>(null);

export const ContextProvider = ({ children }) => {
  const [isMenuOpen, toggleMenu] = React.useState(false);
  const [currentMenu, setCurrentMenu] = React.useState('item0');
  const state: IAppContext = {
    isMenuOpen: isMenuOpen,
    toggleMenu: (payload: boolean) => {
      toggleMenu(payload)
    },
    currentMenu: currentMenu,
    setCurrentMenu: (payload: string) => {
      setCurrentMenu(payload);
    }
  }

  return (
    <AppContext.Provider value={state}>
      {children}
    </AppContext.Provider>
  )
}