import React, { useState,  useEffect  } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import { Route, Routes } from 'react-router-dom';
import Header  from "./Header.js";
import Footer from "./Footer.js";
import Main from './Main.js';
import api  from '../utils/Api.js';
import Login from './Login.js';
import Register from './Register.js';
import InfoTooltip from './InfoTooltip.js';

import ImagePopup  from './ImagePopup.js';
import DeleteCardPopup from './DeleteCardPopup.js';
import EditProfilePopup from './EditProfilePopup.js';
import EditAvatarPopup from './EditAvatarPopup.js'
import AddPlacePopup from './AddPlasePopup.js';


export default function App() {

    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
    const [selectedCard, setSelectedCard] = useState({});
    const [isImagePopupOpen, setImagePopupOpen] = useState(false);
    const [isDeleteCardPopupOpen, setIsDeleteCardPopupOpen] = useState(false);
    const [isInfoTooltip, setIsInfoTooltip] = useState(false);

    const [currentUser, setCurrentUser] = useState({});
    const [cards, setCards] = useState([]);

    useEffect(() => {
        api.getUserInfo()
            .then((userInfo) => {
                setCurrentUser(userInfo);
            })
            .catch((err) => {
                console.log(`Внимание! ${err}`);
            });
    }, []);

    useEffect(() => {
        api.getInitialCards()
            .then((cardsInfo) => {
                setCards(cardsInfo);
            })
            .catch((err) => {
                console.log(`Внимание! ${err}`);
            });
    }, []);
    
    const handleEditAvatarClick = () => {
        setIsEditAvatarPopupOpen(true);
    }

    const handleAddPlaceClick = () => {
        setIsAddPlacePopupOpen(true);
    }

    const handleEditProfileClick = () => {
        setIsEditProfilePopupOpen(true);
    }

    const handleDeleteCardClick = () => {
        setIsDeleteCardPopupOpen(true);
    }

    const handleRegisterClick = () => {
        setIsInfoTooltip(true);
    }


    const closeAllPopups = () => {
        setIsEditAvatarPopupOpen(false);
        setIsAddPlacePopupOpen(false);
        setIsEditProfilePopupOpen(false);
        setImagePopupOpen(false);
        setIsDeleteCardPopupOpen(false);
        setIsInfoTooltip(false);
    }

    const handleCardClick = (data) => {
        setImagePopupOpen(true);
        setSelectedCard(data);
    }

    function handleCardLike(card) {
        const isLiked = card.likes.some((i) => i._id === currentUser._id);
    
        api.changeLikeCardStatus(card._id, !isLiked)
            .then((newCard) => {
                setCards((state) =>
                state.map((c) => (c._id === card._id ? newCard : c))
            );
        })
            .catch((err) => {
                console.log(`Внимание! ${err}`);
            });
    }

    function handleCardDelete(card) {
        api.deleteCard(card._id)
            .then(() => {
            setCards((state) => 
            state.filter((c) => c._id !== card._id));
            })
            .catch((err) => {
            console.log(`Внимание! ${err}`);
            });
    }

    function handleUpdateUser(data) {
        api.setUserInfo(data)
            .then((userInfo) => {
                setCurrentUser(userInfo);
                closeAllPopups();
            })
            .catch((err) => {
                console.log(`Внимание! ${err}`);
            });
    }

    function handleUpdateAvatar(data) {
        api.addAvatar(data)
            .then((userAvatar) => {
            setCurrentUser(userAvatar);
            closeAllPopups();
            })
            .catch((err) => {
                console.log(`Внимание! ${err}`);
            });
    }

    function handleAddCard(element) {
        api.addCard(element)
                .then((newCard) => {
                    setCards([newCard, ...cards]);
                    closeAllPopups();
                })
                .catch((err) => {
                    console.log(`Внимание! ${err}`);
                });
    }

return (
<div className="page">
    <CurrentUserContext.Provider value={currentUser}>
        <Header />
        <Register
            onInfoTooltip={handleRegisterClick}
        />
        <Login />
                <Main 
                    onEditAvatar={handleEditAvatarClick}
                    onAddPlace={handleAddPlaceClick}
                    onEditProfile={handleEditProfileClick}
                    onCardClick={handleCardClick}
                    cards={cards}
                    onCardLike={handleCardLike}
                    onCardDelete={handleCardDelete}
                />
        <Footer />
        <ImagePopup 
            data={selectedCard}
            isOpen={isImagePopupOpen}
            onClose={closeAllPopups}
        />
        <EditAvatarPopup 
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
        />
        <EditProfilePopup 
            isOpen={isEditProfilePopupOpen} 
            onClose={closeAllPopups} 
            onUpdateUser={handleUpdateUser}
            />
        <AddPlacePopup 
            isOpen={isAddPlacePopupOpen} 
            onClose={closeAllPopups} 
            onAddCard={handleAddCard}
            />     
        <DeleteCardPopup
            isOpen={isDeleteCardPopupOpen} 
            onClose={closeAllPopups} 
        />
        <InfoTooltip
            isOpen={isInfoTooltip} 
            onClose={closeAllPopups} 
        />
    </CurrentUserContext.Provider>
</div>
);
}