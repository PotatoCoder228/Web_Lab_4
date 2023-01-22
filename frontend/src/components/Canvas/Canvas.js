import React, {useState} from 'react';
import './Canvas-style.css';
import svgImage from './batman.svg';
import axiosInstance from "../axios/Axios";
import {Point} from "../../App";

const Canvas = ({coordinates, rows, setConnectionStat}) => {

    const canone = 68;

    const warnStatStyle = {
        color: 'red'
    }
    const okStatStyle = {
        color: 'green'
    }

    const [sendStat, setSendStat] = useState(0);

    const clearCanvas = (canvas, canvasCtx) => {
        canvasCtx.clearRect(0, 0, canvas.width, canvas.height);
    }

    function sendNewPointOnServer() {
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
                    setSendStat(0);
                } else {
                    console.log("Hit is Not OK");
                    setConnectionStat(<div className="MainPage-connect-stat"
                                           style={warnStatStyle}>{response.data.result}</div>);
                    setSendStat(-1);
                }
            }).catch((error) => {
            if (error.response === undefined) {
                setConnectionStat(<div className="MainPage-connect-stat" style={warnStatStyle}>Что-то пошло не
                    так...<br></br>Соединение с сервером потеряно</div>);
            } else {
                setConnectionStat(<div className="MainPage-connect-stat"
                                       style={warnStatStyle}>{error.response.data.result}</div>);
            }
            setSendStat(-1);
        });
    }

    const drawCurrent = (event) => {
        setConnectionStat(<div className="MainPage-connect-stat">Отправка...</div>);
        let currentCanvas = document.getElementById("Cur-graph");
        let canvasCtx = currentCanvas.getContext('2d');

        coordinates.x = (event.nativeEvent.offsetX - currentCanvas.width / 2) / canone * coordinates.r;
        coordinates.y = (-event.nativeEvent.offsetY + currentCanvas.height / 2) / canone * coordinates.r;

        sendNewPointOnServer();
        if (sendStat === 0) {
            clearCanvas(currentCanvas, canvasCtx);

            const x = coordinates.x * canone / coordinates.r + currentCanvas.width / 2;
            const y = -(coordinates.y / coordinates.r * canone - currentCanvas.height / 2);

            if (x > currentCanvas.width || x < 0 ||
                y > currentCanvas.height || y < 0) {
                return;
            }

            canvasCtx.setLineDash([2, 2]);
            canvasCtx.fillStyle = 'black';
            canvasCtx.beginPath();
            canvasCtx.moveTo(x, currentCanvas.width / 2);
            canvasCtx.lineTo(x, y);
            canvasCtx.moveTo(currentCanvas.height / 2, y);
            canvasCtx.lineTo(x, y);
            canvasCtx.stroke();
            canvasCtx.arc(x, y, 2, 0, 2 * Math.PI);
            canvasCtx.fill();
        } else {

        }
    }


    return (
        <div className="Canvas-container">
            <div className="Header-col-name">
                Graph
            </div>
            <div className="Image-container">
                <img src={svgImage} className="Svg-graph" id="Svg-graph" width="440" height="440" alt="График"/>
                <canvas className="Prev-hits-graph" id="Prev-hits-graph" width="440" height="440">Предыдущие проверки
                </canvas>
                <canvas className="Cur-graph" onClick={drawCurrent} id="Cur-graph" width="440"
                        height="440">Интерактивная область графика
                </canvas>
            </div>
        </div>
    );
}
export default Canvas;