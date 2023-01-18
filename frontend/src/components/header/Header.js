import React from 'react';
import logo from './logo.svg';
import './Header-style.css';

export function Header() {

    return (
        <div>
            <a href="/login"><img className="Header-logo" src={logo}/></a>
            <header className="App-header">
                <h1 id="Lab-name">Лабораторная работа №4</h1>
                <h2 id="Maker-name">Аталян Александр Эдуардович</h2>
                <h3 id="Maker-group">Группа P32081</h3>
            </header>
        </div>
    )

}