import React from "react";
import "./TimeInput.css";

const TimeInput = (props) => {
  return (
    <React.Fragment>
      <div className="backdrop" onClick={props.dismiss}/>
      <div className="card_pop_container">
        <div className="card_pop">
          <input className="time_input" type="time" step="1" onChange={(e) => {
              props.setTime(e.target.value)
          }}/>
        </div>
      </div>
    </React.Fragment>
  );
};

export default TimeInput;
