import React, {useState} from 'react';
import './Registration-style.css';
import {useHistory} from "react-router-dom";
import axiosInstance from "../axios/Axios";

let regErr = "";

export function Registration({
                                 setIsLoggedIn,
                             }) {
    const history = useHistory();

    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [checkPassword, setCheckPassword] = useState('');

    const useForceRerendering = () => {
    const [counter, setCounter] = React.useState(0);
    return () => setCounter(counter => counter + 1);
    };
    const forceRerendering = useForceRerendering();

    const handleCheckPasswordChange = (e) => {
        if (password !== e.target.value) {
            regErr = <div className="Registration-error">Пароли не совпадают!</div>
        } else {
            regErr = ""
        }
        setCheckPassword(e.target.value);
    }

    const handleLoginChange = (e) => {
        setLogin(e.target.value)
    }

    const handlePasswordChange = (e) => {
        if (checkPassword !== e.target.value) {
            regErr = <div className="Registration-error">Пароли не совпадают!</div>
        } else {
            regErr = ""
        }
        setPassword(e.target.value)
    }

    const redirectToLogin = (e) => {
        history.push('/login');
    }

    const handleRegistration = (e) => {
        e.preventDefault();
        console.log("Пробуем");
        if (checkPassword !== password) {
            history.push('/registration');
        } else {
            axiosInstance.post('/registration', {
                login: login,
                password: password
            }, {withCredentials: true})
                .then(function (response) {
                    console.log(response);
                    if (response.status === 200) {
                        setIsLoggedIn(true);
                        regErr = <div className="Registration-error">Регистрация прошла успешно</div>
                        console.log("OK");
                        history.push('/user/');
                    } else {
                        setIsLoggedIn(false);
                        console.log("NOT OK")
                        regErr = <div className="Registration-error">Что-то пошло не так...</div>
                        history.push('/registration');
                    }
                }).catch(function (error) {
                    forceRerendering();
                    regErr = <div className="Registration-error">{error.response.data.result}</div>
                    history.push('/registration');
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