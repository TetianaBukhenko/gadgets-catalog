import { useContext, useEffect } from 'react';

import './Menu.scss';
import { Navigation } from '../../components/Header/components/Navigation';
import { NavIcons } from '../../components/NavIcons';
import { MenuContext } from '../../store/MenuContext';

export const Menu: React.FC = () => {
  const { displayMenu, setDisplayMenu } = useContext(MenuContext);

  useEffect(() => {
    if (displayMenu) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'inherit';
    }
  }, [displayMenu]);

  return (
    <aside className={`menu ${!displayMenu && 'menu--hidden'}`} id="menu">
      <Navigation className="menu__nav" />
      <div
        className="menu__icons"
        onClick={() => {
          setDisplayMenu(false);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      >
        <NavIcons />
      </div>
    </aside>
  );
};
