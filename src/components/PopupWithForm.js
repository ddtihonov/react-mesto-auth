import React from 'react';

export default function PopupWithForm (props) {

    return (
    <div className={`popup popup_type_${props.name} ${props.isOpen ? 'popup_opened' : ''}`}  >
        <div className="popup__container popup__container_cell_exchange">
            <button className="popup__close-icon link-aim" type="button" aria-label="закрыть" onClick={props.onClose}></button>
            <img className="popup__image" src={props.image} alt="Лого"/>
            <p className="popup__text">{props.text}</p>
            <form className="form" name={props.name} onSubmit={props.onSubmit}>
                <h2 className="form__title">{props.title}</h2>
                {props.children}
                <button className="form__button form__button-image" type="submit">{props.buttonText}</button>
            </form>
        </div> 
    </div>
)
}