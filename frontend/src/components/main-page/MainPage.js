import React from 'react';
import './MainPage-style.css';
import {Canvas} from "../Canvas/Canvas";
import ShotDataForm from "../shot-data-form/ShotDataForm";
import {ResultTable} from "../result-table/ResultTable";
import {Header} from "../header/Header";

export function MainPage({setIsLoggedIn}) {
    return (
        <div>
            <Header setIsLoggedIn={setIsLoggedIn}></Header>
            <div className="Main-div">
                <div className="MainPage-table">
                    <Canvas></Canvas>
                    <ShotDataForm></ShotDataForm>
                    <ResultTable></ResultTable>
                </div>
            </div>
        </div>
    );
}