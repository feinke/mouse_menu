import * as React from 'react';
import { AppContext } from './ContextProvider';
import { useTransition, animated } from 'react-spring'
import styled from 'styled-components';

interface IMenuData {
  name: string,
  link: string
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
  will-change: transform, opacity;
`;

export const MenuItem = () => {
  const context = React.useContext(AppContext);
  const onClickLi = (e: React.MouseEvent) => {
    e.stopPropagation();
    context.toggleMenu(false);
  };

  const menuItemTransistions = useTransition(context.isMenuOpen ? MenuData : [], (item: IMenuData) => item.name, {
    trail: 400,
    from: { opacity: 0, transform:('scale(0)') },
    enter: { opacity: 1, transform:('scale(1)') },
    leave: { opacity: 0, transform:('scale(0)') }
  });

  return (
    <div style={{ padding: '20px' }}>
      {menuItemTransistions.map(({item, key, props}) => (
        <Item key={key} style={{ ...props }} onClick={onClickLi}>
          {item.name}
        </Item>
      ))}
    </div>
  )
}