import React from 'react';
import './ShotDataForm-style.css';
import axiosInstance from "../axios/Axios";
import {Point} from "../../App";

const ShotDataForm = ({coordinates, rows, connectionStat, setConnectionStat, setters}) => {

    const warnStatStyle = {
        color: 'red'
    }
    const okStatStyle = {
        color: 'green'
    }

    const onSubmit = (e) => {
        setConnectionStat(<div className="MainPage-connect-stat">Отправка...</div>);
        if(coordinates.getY()>5||coordinates.getY()<-3){
            setConnectionStat(<div className="MainPage-connect-stat"
                                       style={warnStatStyle}>Значение Y не входит в диапазон от -3 до 5!</div>);
            return;
        }
        e.preventDefault();
        axiosInstance.post('/hits', {
            x: coordinates.getX(),
            y: coordinates.getY(),
            r: coordinates.getR(),
            login: ""
        }, {withCredentials: true})
            .then(function (response) {
                if (response.status === 200) {
                    let point = new Point();
                    point.setX(response.data.x);
                    point.setY(response.data.y);
                    point.setR(response.data.r);
                    point.setHitResult(response.data.hitResult);
                    rows.addRow(point);
                    rows.render();
                    console.log("x:" + response.data.x);
                    console.log("y:" + response.data.y);
                    console.log("r:" + response.data.r);
                    console.log("hitResult:" + response.data.hitResult);
                    setConnectionStat(<div className="MainPage-connect-stat" style={okStatStyle}>Отправлено</div>);
                } else {
                    console.log("Hit is Not OK");
                    setConnectionStat(<div className="MainPage-connect-stat"
                                           style={warnStatStyle}>{response.data.result}</div>);
                }
            }).catch((error) => {
            console.log(error);
            if (error.response === undefined) {
                setConnectionStat(<div className="MainPage-connect-stat" style={warnStatStyle}>Что-то пошло не
                    так...<br></br>Соединение с сервером потеряно</div>);
            } else {
                setConnectionStat(<div className="MainPage-connect-stat"
                                       style={warnStatStyle}>{error.response.data.result}</div>);
            }
        });
    }

    const checkBoxOneValue = (e) => {
        let checkboxes = document.getElementsByClassName("ShotDataForm-checkbox-x");
        for (let i = 0; i < checkboxes.length; i++) {
            checkboxes[i].checked = false;
            if (e.target.value === checkboxes[i].value) {
                checkboxes[i].checked = true;
                coordinates.setX(checkboxes[i].value);
                console.log(checkboxes[i].value);
            }
        }
    }

    const onInputTextChange = (e) => {
        let text = document.getElementsByClassName("ShotDataForm-text-y");
        text[0].value = text[0].value.replace(",",".");
        coordinates.setY(text[0].value);
    }

    const onButtonChange = (e) => {
        coordinates.setR(e.target.value);
        console.log(e.target.value);
        coordinates.redrawSvg();
    }

    const onClearClick = (e) => {
        setConnectionStat(<div className="MainPage-connect-stat">Очистка...</div>);
        e.preventDefault();
        axiosInstance.delete('/hits', {withCredentials: true})
            .then(function (response) {
                if (response.status === 200) {
                    console.log("Clearing is ok");
                    rows.deleteAll();
                    rows.render();
                    let canvas = document.getElementById("Prev-hits-graph");
                    let canvasCtx = canvas.getContext('2d');
                    canvasCtx.clearRect(0, 0, canvas.width, canvas.height);
                    setConnectionStat(<div className="MainPage-connect-stat"
                                           style={okStatStyle}>{response.data.result}</div>);
                } else {
                    console.log("Clearing error");
                    setConnectionStat(<div className="MainPage-connect-stat"
                                           style={warnStatStyle}>{response.data.result}</div>);
                }
            }).catch((error) => {
            console.log(error);
            if (error.response === undefined) {
                setConnectionStat(<div className="MainPage-connect-stat" style={warnStatStyle}>Что-то пошло не
                    так...<br></br>Соединение с сервером потеряно</div>);
            } else {
                setConnectionStat(<div className="MainPage-connect-stat"
                                       style={warnStatStyle}>{error.response.data.result}</div>);
            }
        });
    }

    return (
        <div className="ShotDataForm-column">
            <div className="ShotDataForm-column-name">Coordinates</div>
            <div className="ShotDataForm-coordinates-form">
                <div className="ShotDataForm-inputs">

                    <div className="ShotDataForm-input-name">
                        Enter X:
                    </div>
                    <div className="ShotDataForm-input" id="ShotDataForm-input-x">
                        <input type="checkbox" className="ShotDataForm-checkbox-x" onClick={checkBoxOneValue}
                               value="-4"/>-4
                        <input type="checkbox" className="ShotDataForm-checkbox-x" onClick={checkBoxOneValue}
                               value="-3"/>-3
                        <input type="checkbox" className="ShotDataForm-checkbox-x" onClick={checkBoxOneValue}
                               value="-2"/>-2
                        <input type="checkbox" className="ShotDataForm-checkbox-x" onClick={checkBoxOneValue}
                               value="-1"/>-1
                        <input type="checkbox" className="ShotDataForm-checkbox-x" onClick={checkBoxOneValue}
                               value="0" defaultChecked="true"/>0
                        <input type="checkbox" className="ShotDataForm-checkbox-x" onClick={checkBoxOneValue}
                               value="1"/>1
                        <input type="checkbox" className="ShotDataForm-checkbox-x" onClick={checkBoxOneValue}
                               value="2"/>2
                        <input type="checkbox" className="ShotDataForm-checkbox-x" onClick={checkBoxOneValue}
                               value="3"/>3
                        <input type="checkbox" className="ShotDataForm-checkbox-x" onClick={checkBoxOneValue}
                               value="4"/>4
                    </div>

                    <div className="ShotDataForm-input-name">
                        Enter Y:
                    </div>
                    <div className="ShotDataForm-input" id="ShotDataForm-input-y">
                        <input type="number" required="true" className="ShotDataForm-text-y" id="ShotDataForm-text-y"
                               placeholder="From -3 to 5." max="5" min="-3"
                               onChange={onInputTextChange} autoComplete="true" defaultValue="0"></input>
                    </div>
                    <div className="ShotDataForm-input-name">
                        Enter R:
                    </div>
                    <div className="ShotDataForm-input" id="ShotDataForm-input-r">
                        <button className="ShotDataForm-button-r" onClick={onButtonChange} value="1">
                            1
                        </button>
                        <button className="ShotDataForm-button-r" onClick={onButtonChange} value="2">
                            2
                        </button>
                        <button className="ShotDataForm-button-r" onClick={onButtonChange} value="3">
                            3
                        </button>
                        <button className="ShotDataForm-button-r" onClick={onButtonChange} value="4">
                            4
                        </button>
                    </div>
                </div>
                <div className="ShotDataForm-request-buttons">
                    {connectionStat}
                    <button id="ShotDataForm-input-submit" onClick={onSubmit}>Отправить</button>
                    <button id="ShotDataForm-input-clear" onClick={onClearClick}>Очистить</button>
                </div>
            </div>
        </div>
    );
}


export default ShotDataForm;