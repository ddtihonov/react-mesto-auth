import React from 'react';
import { Link } from 'react-router-dom';
import { useState } from 'react'; 
import logo from '../images/Logo.svg';

export default function Header(props) {

    const [isMobileOpen, setIsMobileOpen] = useState(false);

    return (
    <header className="header">
        <div className={`header__burger ${isMobileOpen ? 'active' : ''}`} >
            <p className="header__text" >{props.email}</p>
            <Link
                to="/"
                className="header__link_mobile"
                onClick={props.onOut}>
                Выйти
            </Link>                
        </div>
        <div className="header__container">
            <img src={logo} alt="Лого" className="header__logo"/>
            {props.loggedIn && 
                <div className="menu__icon" onClick={setIsMobileOpen(true)}>
                    <span></span>
                </div>
            }
            <div className="header__box">
                {props.loggedIn ? (
                    <>
                        <p className="header__text" >{props.email}</p>
                        <Link
                        to="/"
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