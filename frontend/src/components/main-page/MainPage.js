import React, {useState} from 'react';
import './MainPage-style.css';
import Graph from "../canvas/Graph";
import ShotDataForm from "../shot-data-form/ShotDataForm";
import {ResultTable} from "../result-table/ResultTable";
import {Header} from "../header/Header";
import axiosInstance from "../axios/Axios";

export function MainPage({setIsLoggedIn, coordinates, rows}) {

    const [xVal, setXVal] = useState(0);
    const [yVal, setYVal] = useState(0);
    const [rVal, setRVal] = useState(1);

    const setters = {
        setXVal: setXVal,
        setYVal: setYVal,
        setRVal: setRVal
    }

    const [connectionStat, setConnectionStat] = useState(<div className="MainPage-connect-stat"></div>);
    const loadTableFromServer = (rows) => {
        axiosInstance.get('/hits', {withCredentials: true}).then(function (response) {
            if (response.status === 200) {
                rows.convertToRow(response.data);
                console.log("С сервера загружено " + rows.length + " строк");
                rows.render();
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
                    <Graph coordinates={coordinates} rows={rows} setConnectionStat={setConnectionStat}></Graph>
                    <ShotDataForm coordinates={coordinates} rows={rows} connectionStat={connectionStat}
                                  setConnectionStat={setConnectionStat} setters={setters}></ShotDataForm>
                    <ResultTable rows={rows}></ResultTable>
                </div>
            </div>
        </div>
    );
}