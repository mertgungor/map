import React from "react";
import "./button.css";

function Button() {
  return (
    <div className="buttons-container">
      <button className="button">Telemetry On/Off</button>
      <button className="button">Simulation Mod On/Off</button>
      <button className="button">COM</button>
      <button className="button">Baud</button>
      <button className="button">Start Recording</button>
    </div>
  );
}

export default Button;
