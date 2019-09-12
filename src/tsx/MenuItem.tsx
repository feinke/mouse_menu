import * as React from 'react';
import { AppContext } from './ContextProvider';
import { useTransition, animated, useChain, ReactSpringHook } from 'react-spring'
import styled from 'styled-components';

interface IMenuData {
  name: string,
  link: string
}

interface IMenuDataProps {
  menuRef: React.RefObject<ReactSpringHook>
}

const MenuData: IMenuData[] = [
  {
    name: 'item 1',
    link: '#item1'
  },
  {
    name: 'item 2',
    link: '#item2'
  }
]

const Item = styled(animated.div)`
  transform-origin: 0 50%;
  will-change: transform, opacity;
`;

export const MenuItem = (props: IMenuDataProps) => {
  const context = React.useContext(AppContext);
  const onClickLi = (e: React.MouseEvent) => {
    e.stopPropagation();
    context.toggleMenu(false);
  };

  const menuItemRef = React.useRef();
  const menuItemTransistions = useTransition(context.isMenuOpen ? MenuData : [], (item: IMenuData) => item.name, {
    ref: menuItemRef,
    unique: true,
    trail: 100,
    from:  { opacity: 0, transform: ('translateX(-10px)') },
    enter: { opacity: 1, transform: ('translateX(0)') },
    leave: { opacity: 0, transform: ('translateX(-10px)') }
  });

  useChain(context.isMenuOpen ? [props.menuRef, menuItemRef] : [menuItemRef, props.menuRef], [0, 0.5]);

  return (
    <div style={{ padding: '20px' }}>
      {menuItemTransistions.map(({ item, key, props }) => (
        <Item key={key} style={{ ...props }} onClick={onClickLi}>
          {item.name}
        </Item>
      ))}
    </div>
  )
}