import React from 'react';
import './MainPage-style.css';
import Canvas from "../Canvas/Canvas";
import ShotDataForm from "../shot-data-form/ShotDataForm";
import {ResultTable} from "../result-table/ResultTable";
import {Header} from "../header/Header";
import axiosInstance from "../axios/Axios";

export function MainPage({setIsLoggedIn, coordinates, rows}) {
    const loadTableFromServer = (rows) => {
        axiosInstance.get('/hits', {withCredentials: true}).then(function (response) {
            if (response.status === 200) {
                rows.convertToRow(response.data);
                rows.render();
                console.log(response.data);
                console.log(rows.rows);
            } else {
                console.log("Hit is Not OK");
            }
        }).catch((error) => {
            console.log(error);
        });
    }
    loadTableFromServer(rows);
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