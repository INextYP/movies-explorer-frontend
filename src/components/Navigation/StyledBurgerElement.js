import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

const StyledBurger = styled.button`
    display: none;

  @media screen and (max-width: 768px) {
    position: absolute;
    top: 5%;
    right: 3%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    width: 30px;
    height: 22px;
    background: transparent;
    border: none;
    cursor: pointer;
    padding: 0;
    z-index: 10000;
    margin: 0;
    align-items: center;


    &:focus {
      outline: none;
    }

    .navigation__burger-menu-button-element {
      width: 22px;
      height: 2.5px;
      background: #fff;
      border-radius: 10px;
      transition: all 0.3s linear;
      position: relative;
      transform-origin: 1px;

      :first-child {
        transform: ${({ open }) => (open ? 'rotate(45deg)' : 'rotate(0)')};
      }

      :nth-child(2) {
        opacity: ${({ open }) => (open ? '0' : '1')};
        transform: ${({ open }) => (open ? 'translateX(20px)' : 'translateX(0)')};
      }

      :nth-child(3) {
        transform: ${({ open }) => (open ? 'rotate(-45deg)' : 'rotate(0)')};
      }
    }
  }
`;

const StyledMenu = styled.nav`
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: #202020;
  transform: ${({ open }) => (open ? 'translateX(0)' : 'translateX(100%)')};
  height: 100vh;
  width: 520px;
  position: absolute;
  top: 0;
  right: 0;
  transition: transform 0.3s ease-in-out;
  z-index: 999;

  @media (max-width: 576px) {
      width: 100%;
    }

  .burger-menu__link {
    font-weight: 500;
    font-size: 18px;
    line-height: 22px;
    text-decoration: none;
    margin: 0 auto;
    text-align: center;
    color: #FFF;
    display: flex;
    justify-content: center;
    transition: opacity .7s ease-in-out;

    :not(:last-child) {
      margin-bottom: 28px;
    }

    :first-child {
      margin-top: auto;
    }

    :last-child {
      margin-top: auto;
      margin-bottom: 92px;
    }

    @media (max-width: 576px) {
      font-size: 1.5rem;
      text-align: center;
    }

    &:hover {
      opacity: .5;
    }
  }

  .burger-menu__link_type_account {
    align-self: end;
  }
`;

const BurgerMenu = ({ open }) => (
    <StyledMenu open={open}>
      <NavLink to="/" className="burger-menu__link">Главная</NavLink>
      <NavLink to="/movies" className="burger-menu__link" activeClassName="burger-menu__link_active">Фильмы</NavLink>
      <NavLink to="/saved-movies" className="burger-menu__link" activeClassName="burger-menu__link_active">Сохранённые фильмы</NavLink>
      <NavLink to="/profile" className="burger-menu__link burger-menu__link_type_account" activeClassName="burger-menu__link_active">
        Аккаунт
        <div className="navigation__link_type_profile-icon"></div>
      </NavLink>
    </StyledMenu>
);

const BurgerMenuIcon = ({ open, onClick }) => (<StyledBurger open={open} onClick={onClick}>
    <div className='navigation__burger-menu-button-element'/>
    <div className='navigation__burger-menu-button-element'/>
    <div className='navigation__burger-menu-button-element'/>
  </StyledBurger>);

export { BurgerMenuIcon, BurgerMenu };
