import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../images/logo.svg';
import Navigation from '../Navigation/Navigation';
import NavTab from '../NavTab/NavTab';

function Header({ loggedIn }) {
  return (
        <header className={`header ${!loggedIn ? 'header_status_authorized' : ''}`}>
            <Link to="/" className="header__link">
                <img src={logo} className="header__logo" alt='Логотип' />
            </Link>
          {loggedIn && <Navigation />}
          {!loggedIn && <NavTab />}
        </header>
  );
}

export default Header;
