import React from 'react';

class Login extends React.Component {
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
        <div className="login">
            <h2 className="login__title">Вход</h2>
            <form className="login__form"  onSubmit={this.handleSubmit}>
                <label className="login__label">
                    <input className="login__input"
                    type="email" 
                    name="email" 
                    id="email-input" placeholder="Email" 
                    minLength="6" maxLength="20" 
                    required/>
                    <span className="login__input-error email-input-error form__input-error"></span>
                </label>
                <label className="login__label">
                    <input className="login__input"
                    type="password" 
                    name="password" 
                    id="password-input" 
                    placeholder="Пароль"  
                    minLength="6" 
                    maxLength="20" required/>
                    <span className="login__input-error password-input-error form__input-error"></span>
                </label>
                <button className="login__button" type="submit">Войти</button>
            </form>
        </div>
    )
    }
}

export default Login;
