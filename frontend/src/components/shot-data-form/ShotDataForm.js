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
        <div className="MainPage-column">
            <div className="MainPage-column-name">Coordinates</div>
            <form className="coordinates-form" onSubmit={handleSubmit(onSubmit)}>
                <div className="MainPage-inputs">

                    <div className="MainPage-input-name">
                        Input X:
                    </div>
                    <div className="MainPage-input">
                        <input type="checkbox" name="xValue" value="-4"/>-4
                        <input type="checkbox" name="xValue" value="-3"/>-3
                        <input type="checkbox" name="xValue" value="-2"/>-2
                        <input type="checkbox" name="xValue" value="-1"/>-1
                        <input type="checkbox" name="xValue" value="0"/>0
                        <input type="checkbox" name="xValue" value="1"/>1
                        <input type="checkbox" name="xValue" value="2"/>2
                        <input type="checkbox" name="xValue" value="3"/>3
                        <input type="checkbox" name="xValue" value="4"/>4
                    </div>

                    <div className="MainPage-input-name">
                        Input Y:
                    </div>
                    <div className="MainPage-input">
                        <input type="text" autoComplete="true"></input>
                    </div>
                    <div className="MainPage-input-name">
                        Input R:
                    </div>
                    <div className="MainPage-input">
                        <button className="DataForm-button" value="1">
                            1
                        </button>
                        <button className="DataForm-button" value="1">
                            2
                        </button>
                        <button className="DataForm-button" value="1">
                            3
                        </button>
                        <button className="DataForm-button" value="1">
                            4
                        </button>
                    </div>
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