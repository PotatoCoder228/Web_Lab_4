import React from 'react';
import './Canvas-style.css';
import svgImage from './batman.svg';
import * as svgjs from "@svgdotjs/svg.js";

export function Canvas() {

    const canvasRender = (event) => {
    }

    return (
        <div className="Canvas-container">
            <div className="Header-col-name">
                Graph
            </div>
            <div className="Image-container">
                <img src={svgImage} className="Svg-graph" width="440" height="440" alt="График"/>
                <canvas className="Prev-hits-graph" id = "Prev-hits-graph" width="440" height="440">Предыдущие проверки
                </canvas>
                <canvas className="Cur-graph" onClick={canvasRender} id = "Cur-graph" width="440"
                        height="440">Интерактивная область графика
                </canvas>
            </div>
        </div>
    );
}