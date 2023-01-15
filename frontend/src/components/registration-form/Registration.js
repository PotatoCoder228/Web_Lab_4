import React from 'react';
import './Registration-style.css';

export function Registration() {
    return(
        <div id="Registration-block">
            <div id="login-row">
                <div id="input-login-name">Придумайте логин:</div>
                <div>
                    <input type="text" autoComplete="true" id="input-login-input"></input>
                </div>
            </div>
            <div id="password-row">
                <p id="input-password-name">Новый пароль:</p>
                <input type="password" id="input-password-input"></input>
            </div>
            <div id="new-password-row">
                <p id="input-new-password-name">Повторите новый пароль:</p>
                <input type="password" id="input-new-password-input"></input>
            </div>
            <div id="Submit-div">
                <button className="Log-in-button" type="submit">Зарегистрироваться</button>
            </div>
            <div id="Reg-div">
                <a className="Back-link" href="/login">К странице входа</a>
            </div>
        </div>
    );
}