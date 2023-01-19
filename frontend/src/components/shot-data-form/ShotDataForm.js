import React from 'react';
import './ShotDataForm-style.css';
import {useForm} from "react-hook-form";

const ShotDataForm = () => {

    const {
        handleSubmit,
    } = useForm();

    const onSubmit = () => {
        //TODO сделать отправку запроса
    }

    const checkBoxOneValue = (e)=> {
        let checkboxes = document.getElementsByClassName("ShotDataForm-checkbox-x");
        for(let i = 0; i < checkboxes.length; i++){
            checkboxes[i].checked = false;
            if(e.target.value === checkboxes[i].value){
                checkboxes[i].checked = true;
            }
        }
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
                        <input type="checkbox" className="ShotDataForm-checkbox-x" onChange={checkBoxOneValue} value="-4"/>-4
                        <input type="checkbox" className="ShotDataForm-checkbox-x" onChange={checkBoxOneValue} value="-3"/>-3
                        <input type="checkbox" className="ShotDataForm-checkbox-x" onChange={checkBoxOneValue} value="-2"/>-2
                        <input type="checkbox" className="ShotDataForm-checkbox-x" onChange={checkBoxOneValue} value="-1"/>-1
                        <input type="checkbox" className="ShotDataForm-checkbox-x" onChange={checkBoxOneValue} value="0"/>0
                        <input type="checkbox" className="ShotDataForm-checkbox-x" onChange={checkBoxOneValue} value="1"/>1
                        <input type="checkbox" className="ShotDataForm-checkbox-x" onChange={checkBoxOneValue} value="2"/>2
                        <input type="checkbox" className="ShotDataForm-checkbox-x" onChange={checkBoxOneValue} value="3"/>3
                        <input type="checkbox" className="ShotDataForm-checkbox-x" onChange={checkBoxOneValue} value="4"/>4
                    </div>

                    <div className="ShotDataForm-input-name">
                        Enter Y:
                    </div>
                    <div className="ShotDataForm-input" id="ShotDataForm-input-y">
                        <input type="text" placeholder="From -3 to 5." autoComplete="true"></input>
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