import React from 'react';
import { Link } from 'react-router-dom'; 
import logo from '../images/Logo.svg';

export default function Header(props) {
    
    return (
    <header className="header">
        <div className="header__container">
            <img src={logo} alt="Лого" className="header__logo"/>
            <div className="header__box"> 
                <p className="header__text" ></p>
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
            </div>
        </div>
    </header>
)
}