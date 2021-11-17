import React from 'react';

import PopupWithForm  from './PopupWithForm';

export default function InfoTooltip (props) {

    return (
        <PopupWithForm name="delete" 
        text="Что-то пошло не так!
        Попробуйте ещё раз." 
        image=""
        isOpen={props.isOpen}
        onClose={props.onClose}
        />
    )


}