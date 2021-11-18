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
import ProtectedRoute from './ProtectedRoute.js';

import ImagePopup  from './ImagePopup.js';
import DeleteCardPopup from './DeleteCardPopup.js';
import EditProfilePopup from './EditProfilePopup.js';
import EditAvatarPopup from './EditAvatarPopup.js'
import AddPlacePopup from './AddPlacePopup.js';


export default function App() {

    //стейты popups
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
    const [isImagePopupOpen, setImagePopupOpen] = useState(false);
    const [isDeleteCardPopupOpen, setIsDeleteCardPopupOpen] = useState(false);
    const [isInfoTooltip, setIsInfoTooltip] = useState(false);

    const [selectedCard, setSelectedCard] = useState({});
    const [currentUser, setCurrentUser] = useState({});
    const [cards, setCards] = useState([]);

    // стейт маршрутов
    const [currentRoute, setCurrentRoute] = useState('');

    //стейт логина
    const [loggedIn, setLoggedIn] = useState(false);

    // запрос  данных пользователя
    useEffect(() => {
        api.getUserInfo()
            .then((userInfo) => {
                setCurrentUser(userInfo);
            })
            .catch((err) => {
                console.log(`Внимание! ${err}`);
            });
    }, []);

    //запроса массива данных карточек
    useEffect(() => {
        api.getInitialCards()
            .then((cardsInfo) => {
                setCards(cardsInfo);
            })
            .catch((err) => {
                console.log(`Внимание! ${err}`);
            });
    }, []);
    
    // открытие всех popup
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

    const handleCardClick = (data) => {
        setImagePopupOpen(true);
        setSelectedCard(data);
    }

    // закрытие всех popup
    const closeAllPopups = () => {
        setIsEditAvatarPopupOpen(false);
        setIsAddPlacePopupOpen(false);
        setIsEditProfilePopupOpen(false);
        setImagePopupOpen(false);
        setIsDeleteCardPopupOpen(false);
        setIsInfoTooltip(false);
    }

    //управление лайками
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

    //удаление карты
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

    //смена данных пользователя
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

    //смена аватара
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
    
    //добавление новой карты
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
        <Header 
            currentRoute={currentRoute}
            loggedIn={loggedIn}
        />
        <Routes>
            <Route exact path="/" element={
            <Main 
                    onEditAvatar={handleEditAvatarClick}
                    onAddPlace={handleAddPlaceClick}
                    onEditProfile={handleEditProfileClick}
                    onCardClick={handleCardClick}
                    cards={cards}
                    onCardLike={handleCardLike}
                    onCardDelete={handleCardDelete}
                />
            } />
            <Route exact path="/sign-up" element={
                <Register
                    setCurrentRoute={setCurrentRoute}
                    onInfoTooltip={handleRegisterClick}
                />
            } /> 
            <Route exact path="/sign-in" element={
                <Login 
                    setCurrentRoute={setCurrentRoute}
                    loggedIn={loggedIn}
                />
            } />
        </Routes>
        {loggedIn && <Footer />}       
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