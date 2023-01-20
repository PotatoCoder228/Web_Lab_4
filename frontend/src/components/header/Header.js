import React from 'react';
import logo from './logo.svg';
import {useHistory} from "react-router-dom";
import './Header-style.css';
import axiosInstance from "../axios/Axios";

export function Header({
                           setIsLoggedIn,
                           isLoggedIn, rows
                       }) {

    const history = useHistory()

    const onLogoClick = (e) => {
        rows.deleteAll();
        console.log("Clicked");
        if (!isLoggedIn) {
            setIsLoggedIn('false');
            history.push("/login");
            return;
        }
        axiosInstance.get('/logout', {withCredentials: true})
            .then(function (response) {
                if (response.status === 200) {
                    setIsLoggedIn('false');
                    console.log("OK");
                } else {
                    console.log("NOT OK")
                }
            });
    }

    return (
        <div>
            <img className="Header-logo" onClick={onLogoClick} src={logo}/>
            <header className="App-header">
                <h1 id="Lab-name">Лабораторная работа №4</h1>
                <h2 id="Maker-name">Аталян Александр Эдуардович</h2>
                <h3 id="Maker-group">Группа P32081</h3>
            </header>
        </div>
    )

}