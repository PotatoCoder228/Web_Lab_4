import React, {useState} from 'react';
import './Registration-style.css';
import {useHistory} from "react-router-dom";
import axiosInstance from "../axios/Axios";

export function Registration({
                                 setIsLoggedIn,
                             }) {
    const history = useHistory();

    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [checkPassword, setCheckPassword] = useState('');

    const [regErr, setRegErr] = useState(<div></div>);
    const warnStyle = {
        color: 'red'
    }
    const handleCheckPasswordChange = (e) => {
        if (password !== e.target.value) {
            setRegErr(<div className="Registration-status">Пароли не совпадают!</div>);
        } else {
            setRegErr(<div></div>);
        }
        setCheckPassword(e.target.value);
    }

    const handleLoginChange = (e) => {
        setLogin(e.target.value)
    }

    const handlePasswordChange = (e) => {
        if (checkPassword !== e.target.value) {
            setRegErr(<div className="Registration-status">Пароли не совпадают!</div>);
        } else {
            setRegErr(<div></div>);
        }
        setPassword(e.target.value)
    }

    const handleRegistration = (e) => {
        setRegErr(<div className="Registration-status">Ожидание ответа...</div>);
        e.preventDefault();
        console.log("Пробуем");
        if (checkPassword !== password) {
            setRegErr(<div className="Registration-status" style={warnStyle}>Пароли не совпадают!</div>);
        } else {
            axiosInstance.post('/registration', {
                login: login,
                password: password
            }, {withCredentials: true})
                .then(function (response) {
                    if (response.status === 200) {
                        setIsLoggedIn('true');
                        setRegErr(<div className="Registration-status">Регистрация прошла успешно</div>);
                        history.push('/user/');
                    } else {
                        setIsLoggedIn('false');
                        console.log("NOT OK")
                        setRegErr(<div className="Registration-status">{response.data.result}</div>);
                    }
                }).catch(function (error) {
                console.log(error);
                //forceRerendering();
                if (error.response === undefined) {
                    setRegErr(<div className="Registration-status" style={warnStyle}>Не удалось установить соединение с
                        сервером.</div>);
                } else {
                    setRegErr(<div className="Registration-status">{error.response.data.result}</div>);
                }
            });
        }
    };

    return (
        <div id="Registration-block">
            <h2>Регистрация</h2>
            <form className="registrationForm" onSubmit={handleRegistration}>
                <div id="login-row">
                    <div id="input-login-name">Придумайте логин:</div>
                    <div>
                        <input type="text" placeholder="Логин"
                               onChange={handleLoginChange}
                               value={login}
                               required autoComplete="true" id="input-login-input"></input>
                    </div>
                </div>
                <div id="password-row">
                    <p id="input-password-name">Новый пароль:</p>
                    <input type="password" placeholder="Новый пароль"
                           onInput={handlePasswordChange}
                           value={password}
                           required id="input-password-input"></input>
                </div>
                <div id="new-password-row">
                    <p id="input-new-password-name">Повторите новый пароль:</p>
                    <input type="password" placeholder="Повторите пароль"
                           onInput={handleCheckPasswordChange}
                           value={checkPassword}
                           required id="input-new-password-input"></input>
                </div>
                {regErr}
                <div id="Submit-div">
                    <button className="Log-in-button" type="submit">Зарегистрироваться</button>
                </div>
                <div id="Reg-div">
                    <a className="Back-link" href="/login">К странице входа</a>
                </div>
            </form>
        </div>
    );
}