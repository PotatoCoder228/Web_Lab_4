import React, {useState} from 'react';
import './Login-style.css';
import {useHistory} from "react-router-dom";
import axiosInstance from "../axios/Axios";


export function Login({
                          setIsLoggedIn, rows
                      }) {
    //TODO сделать из этого форму, пока так оставляю

    const [logStat, setLogStat] = useState(<div></div>);

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
        e.preventDefault();
        history.push('/registration');
    }

    const warnStyle = {
        color: 'red'
    }

    const handleLogIn = (e) => {
        setLogStat(<div className="Login-status">Ожидание ответа...</div>);
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
                    console.log("NOT OK");
                    setLogStat(<div className="Login-status">{response.data.result}</div>);
                }
            }).catch(function (error) {
            console.log(error);
            if (error.response === undefined) {
                setLogStat(<div className="Login-status" style={warnStyle}>Не удалось установить соединение с
                    сервером</div>);
                setIsLoggedIn('false');
            } else {
                setLogStat(<div className="Login-status">{error.response.data.result}</div>);
                setIsLoggedIn('false');
            }
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