import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import { BurgerMenuIcon, BurgerMenu } from './StyledBurgerElement';

function Navigation() {
  const [isActiveBurgerMenu, setIsActiveBurgerMenu] = useState(false);

  const handleDisplayBurgerMenu = () => {
    setIsActiveBurgerMenu(!isActiveBurgerMenu);
  };

  return (

    <nav className={`navigation ${isActiveBurgerMenu ? 'navigation_place_burger-menu' : ''}`}>
      <BurgerMenuIcon open={isActiveBurgerMenu} onClick={handleDisplayBurgerMenu} />
      {isActiveBurgerMenu && <BurgerMenu open={isActiveBurgerMenu}/>}
      {!isActiveBurgerMenu
        && <div className='navigation__container'>
          <ul className="navigation__list">
            <li className="navigation__list-item">
              <NavLink to="/movies" className="navigation__link" activeClassName="navigation__link_active">Фильмы</NavLink>
            </li>
            <li className="navigation__list-item">
              <NavLink to="/saved-movies" className="navigation__link" activeClassName="navigation__link_active">
                Сохранённые фильмы
              </NavLink>
            </li>
          </ul>
          <NavLink to="/profile" className="navigation__link navigation__link_type_profile" activeClassName="navigation__link_active">
            Аккаунт
            <div className="navigation__link_type_profile-icon"></div>
          </NavLink>
        </div>}
    </nav>
  );
}

export default Navigation;
