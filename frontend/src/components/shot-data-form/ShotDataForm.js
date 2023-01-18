import React from 'react';
import './ShotDataForm-style.css';
import {useForm} from "react-hook-form";

const ShotDataForm = ({serverPort}) => {

    const {
        handleSubmit,
    } = useForm();

    const onSubmit = () => {
        //TODO сделать отправку запроса
    }

    return (
        <div className="ShotDataForm-column">
            <div className="ShotDataForm-column-name">Coordinates</div>
            <form className="ShotDataForm-coordinates-form" onSubmit={handleSubmit(onSubmit)}>
                <div className="ShotDataForm-inputs">

                    <div className="ShotDataForm-input-name">
                        Enter X:
                    </div>
                    <div className="ShotDataForm-input" id="ShotDataForm-input-x">
                        <input type="checkbox" className="ShotDataForm-checkbox-x" value="-4"/>-4
                        <input type="checkbox" className="ShotDataForm-checkbox-x" value="-3"/>-3
                        <input type="checkbox" className="ShotDataForm-checkbox-x" value="-2"/>-2
                        <input type="checkbox" className="ShotDataForm-checkbox-x" value="-1"/>-1
                        <input type="checkbox" className="ShotDataForm-checkbox-x" value="0"/>0
                        <input type="checkbox" className="ShotDataForm-checkbox-x" value="1"/>1
                        <input type="checkbox" className="ShotDataForm-checkbox-x" value="2"/>2
                        <input type="checkbox" className="ShotDataForm-checkbox-x" value="3"/>3
                        <input type="checkbox" className="ShotDataForm-checkbox-x" value="4"/>4
                    </div>

                    <div className="ShotDataForm-input-name">
                        Enter Y:
                    </div>
                    <div className="ShotDataForm-input" id="ShotDataForm-input-y">
                        <input type="text" autoComplete="true"></input>
                    </div>
                    <div className="ShotDataForm-input-name">
                        Enter R:
                    </div>
                    <div className="ShotDataForm-input" id="ShotDataForm-input-r">
                        <button className="ShotDataForm-button-r" value="1">
                            1
                        </button>
                        <button className="ShotDataForm-button-r" value="1">
                            2
                        </button>
                        <button className="ShotDataForm-button-r" value="1">
                            3
                        </button>
                        <button className="ShotDataForm-button-r" value="1">
                            4
                        </button>
                    </div>
                </div>
                <div className="ShotDataForm-request-buttons">
                    <input type="submit" id="ShotDataForm-input-submit" value="Отправить"/>
                    <input type="submit" id="ShotDataForm-input-clear" value="Очистить"/>
                </div>
            </form>
        </div>
    );
}


export default ShotDataForm;

/*
let tryToSendAddAttemptRequest = async (port, token, data) => {
  console.log(port);
  let url = "http://localhost:"+ port +"/attempts";
  console.log("Sending POST request to url: " + url + ". With body: " + JSON.stringify(data));
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': "Bearer " + token
    },
    mode: 'cors',
    body: JSON.stringify(data),
  });
  return await response.json();
}
*/