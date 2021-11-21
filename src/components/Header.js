import React from 'react';
import { Link } from 'react-router-dom'; 
import logo from '../images/Logo.svg';

export default function Header(props) {

    return (
    <header className="header">
        <div className="header__burger">
            <p className="header__text" >{props.email}</p>
            <Link
                to="/sign-in"
                className="header__link_mobile"
                onClick={props.onOut}>
                Выйти
            </Link>                
        </div>
        <div className="header__container">
            <img src={logo} alt="Лого" className="header__logo"/>
            {props.loggedIn && 
                <div class="menu__icon">
                    <span></span>
                </div>
            }
            <div className="header__box">
                {props.loggedIn ? (
                    <>
                        <p className="header__text" >{props.email}</p>
                        <Link
                        to="/sign-in"
                        className="header__link"
                        onClick={props.onOut}
                        >
                        Выйти
                        </Link>
                    </>
                ) : ( 
                <>
                    {(props.currentRoute === '/sign-in') ? (
                    <Link
                        to="/sign-up"
                        className="header__link"
                    >
                        Регистрация
                    </Link>
                    ) : (
                    <Link
                        to="/sign-in"
                        className="header__link"
                    >
                        Войти
                    </Link>
                    )}
                </>
                )}
            </div>
        </div>
    </header>
)
}