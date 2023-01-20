import React from 'react';
import './MainPage-style.css';
import {Canvas} from "../Canvas/Canvas";
import ShotDataForm from "../shot-data-form/ShotDataForm";
import {ResultTable} from "../result-table/ResultTable";
import {Header} from "../header/Header";

export function MainPage({setIsLoggedIn, coordinates, rows}) {
    return (
        <div>
            <Header setIsLoggedIn={setIsLoggedIn} rows={rows}></Header>
            <div className="Main-div">
                <div className="MainPage-table">
                    <Canvas coordinates={coordinates} rows={rows}></Canvas>
                    <ShotDataForm coordinates={coordinates} rows={rows}></ShotDataForm>
                    <ResultTable rows={rows}></ResultTable>
                </div>
            </div>
        </div>
    );
}