import React from "react";
import "./button.css";

function Button(props) {
  return (
    <div className="buttons-container">
      <button className="button" onClick={props.telem}>Telemetry On/Off</button>
      <button className="button">Simulation Mod On/Off</button>
      <button className="button">COM</button>
      <button className="button" onClick={props.setBaud}>Set Baud Rate <div className="info-text">{props.baudrate}</div></button>
      <button className="button">Start Recording</button>
      <button className="button" onClick={props.set_time}>Set Time <div className="info-text">{props.time}</div></button>
    </div>
  );
}

export default Button;
