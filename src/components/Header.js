import React from 'react';
import { Link } from 'react-router-dom'; 
import logo from '../images/Logo.svg';

export default function Header() {

    return (
    <header className="header">
        <div className="header__container">
            <img src={logo} alt="Лого" className="header__logo"/>
            <div className="header__box"> 
                <p className="header__text" ></p>
                <Link className="header__link" to="/sign-up">Регистрация</Link>
            </div>
        </div>
    </header>
)
}