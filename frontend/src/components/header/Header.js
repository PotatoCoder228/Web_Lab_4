import React from 'react';
import logo from './logo.svg';
import './Header-style.css';

export function Header() {

    return (
        <header className="App-header">
            <img src={logo} className="Header-logo" alt="logo"/>
            <div>
                <h1 id="Lab-name">Лабораторная работа №4</h1>
                <h2 id="Maker-name">Аталян Александр Эдуардович</h2>
                <h3 id="Maker-group">Группа P32081</h3>
            </div>
        </header>
    )

}