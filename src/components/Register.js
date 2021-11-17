import React from 'react';
import { Link } from 'react-router-dom'; 

class Register extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            username: '',
            password: ''
    }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }
    handleChange(e) {
        const {name, value} = e.target;
        this.setState({
        [name]: value
        });
    }
    handleSubmit(e){
        e.preventDefault();
    }

    render(){
        return(
        <div className="register">
            <h2 className="register__title">Регистрация</h2>
            <form className="register__form"  onSubmit={this.handleSubmit}>
                <label className="register__label">
                    <input className="register__input"
                    type="email" 
                    name="email" 
                    id="email-input" placeholder="Email" 
                    minLength="6" maxLength="20" 
                    required/>
                    <span className="register__input-error email-input-error form__input-error"></span>
                </label>
                <label className="register__label">
                    <input className="register__input"
                    type="password" 
                    name="password" 
                    id="password-input" 
                    placeholder="Пароль"  
                    minLength="6" 
                    maxLength="20" required/>
                    <span className="register__input-error password-input-error form__input-error"></span>
                </label>
                <button className="register__button" type="submit" onClick={props.onInfoTooltip}>Зарегистрироваться</button>
            </form>
            <div className="register__box">
            <p className="register__text" >Уже зарегистрированы?</p>
            <Link className="register__link" to="/sign-in">Войти</Link>
            </div>
        </div>
    )
    }
}

export default Register;
