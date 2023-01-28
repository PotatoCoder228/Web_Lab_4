import React, {useState} from 'react';
import './Graph-style.css';
import svgImage from './batman.svg';
import axiosInstance from "../axios/Axios";
import {Point} from "../../App";
import PointsCanvas from "./PointsCanvas";

const Graph = ({coordinates, rows, setConnectionStat}) => {

    const canone = 136;
    const loadPrevPoints = () => {
        const pointsCanvas = document.getElementById("Prev-hits-graph");
        clearCanvas(pointsCanvas);
        let pointsCtx = pointsCanvas.getContext('2d');
        for (let i = 0; i < rows.rows.length; i++) {
            pointsCtx.fillStyle = (rows.rows[i].hitResult === "Hit") ? 'green' : 'red';
            pointsCtx.beginPath();
            pointsCtx.arc(
                rows.rows[i].x / coordinates.r * canone + pointsCanvas.width / 2,
                -rows.rows[i].y / coordinates.r * canone + pointsCanvas.height / 2,
                2, 0, 2 * Math.PI);
            pointsCtx.fill();
        }
    }

    const warnStatStyle = {
        color: 'red'
    }
    const okStatStyle = {
        color: 'green'
    }

    const [sendStat, setSendStat] = useState(0);

    const clearCanvas = (pointsCanvas) => {
        let canvasCtx = pointsCanvas.getContext('2d');
        canvasCtx.clearRect(0, 0, pointsCanvas.width, pointsCanvas.height);
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
                    loadPrevPoints();
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
    setInterval(loadPrevPoints, 50);
    const drawCurrent = (event) => {
        setConnectionStat(<div className="MainPage-connect-stat">Отправка...</div>);
        event.preventDefault();

        const currentCanvas = document.getElementById("Cur-graph");
        const currentCtx = currentCanvas.getContext('2d');
        coordinates.x = (event.nativeEvent.offsetX - currentCanvas.width / 2) / canone * coordinates.r;
        coordinates.y = (-event.nativeEvent.offsetY + currentCanvas.height / 2) / canone * coordinates.r;

        sendNewPointOnServer();
        let textInput = document.getElementById("ShotDataForm-text-y");
        console.log("aboba" + textInput);
        textInput.value = coordinates.y;
        if (sendStat === 0) {
            clearCanvas(currentCanvas, currentCtx);

            const x = coordinates.x * canone / coordinates.r + currentCanvas.width / 2;
            const y = -(coordinates.y / coordinates.r * canone - currentCanvas.height / 2);

            if (x > currentCanvas.width || x < 0 ||
                y > currentCanvas.height || y < 0) {
                return;
            }

            currentCtx.setLineDash([2, 2]);
            currentCtx.fillStyle = 'black';
            currentCtx.beginPath();
            currentCtx.moveTo(x, currentCanvas.width / 2);
            currentCtx.lineTo(x, y);
            currentCtx.moveTo(currentCanvas.height / 2, y);
            currentCtx.lineTo(x, y);
            currentCtx.stroke();
            currentCtx.arc(x, y, 2, 0, 2 * Math.PI);
            currentCtx.fill();
        }
    }
    setTimeout(coordinates.redrawSvg, 200);
    return (
        <div className="Canvas-container">
            <div className="Header-col-name">
                Graph
            </div>
            <div className="Image-container">
                <object data={svgImage} type="image/svg+xml" className="Svg-graph" id="Svg-graph" width="440px"
                        height="440px"/>
                <PointsCanvas loadPrevPoints={loadPrevPoints}></PointsCanvas>
                <canvas className="Cur-graph" onClick={drawCurrent} id="Cur-graph" width="440"
                        height="440">Интерактивная область графика
                </canvas>
            </div>
        </div>
    );
}
export default Graph;