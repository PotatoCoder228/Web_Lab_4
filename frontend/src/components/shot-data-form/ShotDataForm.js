import React from 'react';
import './ShotDataForm-style.css';
import axiosInstance from "../axios/Axios";
import {Point} from "../../App";

const ShotDataForm = ({coordinates, rows}) => {

    coordinates.setX(0);
    coordinates.setY(0);
    coordinates.setR(1);

    const onSubmit = (e) => {
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
                } else {
                    console.log("Hit is Not OK");
                }
            }).catch((error) => {
            console.log(error);
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
        coordinates.setY(text[0].value);
    }

    const onButtonChange = (e) => {
        e.preventDefault();
        coordinates.setR(e.target.value);
    }

    const onClearClick = (e) => {
        e.preventDefault();
        axiosInstance.delete('/hits', {withCredentials: true})
            .then(function (response) {
                if (response.status === 200) {
                    console.log("Clearing is ok");
                    rows.deleteAll();
                    rows.render();
                } else {
                    console.log("Clearing error");
                }
            }).catch((error) => {
            console.log(error);
        });
    }

    return (
        <div className="ShotDataForm-column">
            <div className="ShotDataForm-column-name">Coordinates</div>
            <form className="ShotDataForm-coordinates-form" onSubmit={onSubmit}>
                <div className="ShotDataForm-inputs">

                    <div className="ShotDataForm-input-name">
                        Enter X:
                    </div>
                    <div className="ShotDataForm-input" id="ShotDataForm-input-x">
                        <input type="checkbox" className="ShotDataForm-checkbox-x" onChange={checkBoxOneValue}
                               value="-4"/>-4
                        <input type="checkbox" className="ShotDataForm-checkbox-x" onChange={checkBoxOneValue}
                               value="-3"/>-3
                        <input type="checkbox" className="ShotDataForm-checkbox-x" onChange={checkBoxOneValue}
                               value="-2"/>-2
                        <input type="checkbox" className="ShotDataForm-checkbox-x" onChange={checkBoxOneValue}
                               value="-1"/>-1
                        <input type="checkbox" className="ShotDataForm-checkbox-x" onChange={checkBoxOneValue}
                               value="0" checked="true"/>0
                        <input type="checkbox" className="ShotDataForm-checkbox-x" onChange={checkBoxOneValue}
                               value="1"/>1
                        <input type="checkbox" className="ShotDataForm-checkbox-x" onChange={checkBoxOneValue}
                               value="2"/>2
                        <input type="checkbox" className="ShotDataForm-checkbox-x" onChange={checkBoxOneValue}
                               value="3"/>3
                        <input type="checkbox" className="ShotDataForm-checkbox-x" onChange={checkBoxOneValue}
                               value="4"/>4
                    </div>

                    <div className="ShotDataForm-input-name">
                        Enter Y:
                    </div>
                    <div className="ShotDataForm-input" id="ShotDataForm-input-y">
                        <input type="text" required="true" className="ShotDataForm-text-y" placeholder="From -3 to 5."
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
                    <button id="ShotDataForm-input-submit" type="submit">Отправить</button>
                    <button id="ShotDataForm-input-clear" onClick={onClearClick}>Очистить</button>
                </div>
            </form>
        </div>
    );
}


export default ShotDataForm;