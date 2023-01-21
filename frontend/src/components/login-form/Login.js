import React, {useState} from 'react';
import './Login-style.css';
import {useHistory} from "react-router-dom";
import axiosInstance from "../axios/Axios";

let logStat = "";

export function Login({
                          setIsLoggedIn, rows
                      }) {
    //TODO сделать из этого форму, пока так оставляю

    const history = useHistory()

    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');


    const handleLoginChange = (e) => {
        setLogin(e.target.value)
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value)
    }

    const redirectToRegister = (e) => {
        history.push('/registration');
    }


    const handleLogIn = (e) => {
        e.preventDefault();

        axiosInstance.post('/login', {
            login: login,
            password: password
        }, {withCredentials: true})
            .then(function (response) {
                console.log(response);
                if (response.status === 200) {
                    console.log("OK");
                    setIsLoggedIn('true');
                    history.push('/user/');
                } else {
                    setIsLoggedIn('false');
                    console.log("NOT OK")
                    history.push('/');
                }
            }).catch(function (error) {
            setIsLoggedIn('false');
            logStat =
                <div className="Login-error">Не правильный логин или пароль.<br></br>Перепроверьте или зарегистрируйтесь
                    на сайте.</div>;
            history.push('/');
        });
    };

    return (
        <div id="Login-block">
            <h2> Авторизация</h2>
            <form className="loginForm" onSubmit={handleLogIn}>
                <div id="login-row">
                    <div id="input-login-name">Логин:</div>
                    <div>
                        <input type="text" placeholder="Логин"
                               onChange={handleLoginChange}
                               value={login}
                               required autoComplete="true" id="input-login-input"></input>
                    </div>
                </div>
                <div id="password-row">
                    <p id="input-password-name">Пароль:</p>
                    <input type="password" placeholder="Пароль"
                           onChange={handlePasswordChange}
                           value={password}
                           required id="input-password-input"></input>
                </div>
                <div id="Submit-div">
                    {logStat}
                    <button className="Log-in-button" type="submit">Войти</button>
                </div>
                <div id="Reg-div">
                    <a className="Reg-link" onClick={redirectToRegister}>Регистрация</a>
                </div>
            </form>
        </div>
    );
}