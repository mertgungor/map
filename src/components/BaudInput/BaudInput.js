import React from "react";
import "./BaudInput.css"

const BaudInput = (props) => {
  return (
    <React.Fragment>
      <div className="backdrop" onClick={props.dismiss} />
      <div className="card_pop_container">
        <div className="card_pop">
          <div className="baud-options-container">
            <button className="baud-option" onClick = {props.setBaudrate(9600)}>9600</button>
            <button className="baud-option" onClick = {props.setBaudrate(19200)}>19200</button>
            <button className="baud-option" onClick = {props.setBaudrate(38400)}>38400</button>
            <button className="baud-option" onClick = {props.setBaudrate(57600)}>57600</button>
            <button className="baud-option" onClick = {props.setBaudrate(115200)}>115200 </button>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default BaudInput;
