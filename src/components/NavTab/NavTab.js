import { Link } from 'react-router-dom';

function NavTav() {
  return (
    <nav className="nav-tab">
      <ul className="nav-tab__list">
        <li className="nav-tab__list-item">
          <Link to="/sign-up" className="nav-tab__link">
            Регистрация
          </Link>
        </li>
        <li className="nav-tab__list-item">
          <Link to="/sign-in" className="nav-tab__link nav-tab__link_status_login">
            Войти
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default NavTav;
