import React from 'react';
import './Login-style.css';

export function Login() {
    //TODO сделать из этого форму, пока так оставляю
    const handleLogIn = ()=>{
        return "aboba";
    };

    return (
        <div id="Login-block">
            <div id="login-row">
                <div id="input-login-name">Логин:</div>
                <div>
                    <input type="text" autoComplete="true" id="input-login-input"></input>
                </div>
            </div>
            <div id="password-row">
                <p id="input-password-name">Пароль:</p>
                <input type="password" id="input-password-input"></input>
            </div>
            <div id="Submit-div">
                <button className="Log-in-button" type="submit">Войти</button>
            </div>
            <div id="Reg-div">
                <a className="Reg-link" href="/registration">Регистрация</a>
            </div>
        </div>
    );
}