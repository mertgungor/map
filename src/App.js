import "./App.css";
import React, { useState, useEffect } from "react";
import socketIOClient from "socket.io-client";
import Button from "./components/Button/Button";
import Cam from "./components/Cam/Cam";
import TelemData from "./components/TelemData/TelemData";
import Map from "./components/Map/Map";
import LineChart from "./components/LineChart/LineChart";
import Cube from "./components/Cube/Cube";
import TimeInput from "./components/TimeInput/TimeInput";
import BaudInput from "./components/BaudInput/BaudInput";

const ENDPOINT_C = "http://127.0.0.1:4848/";
const ENDPOINT_T = "http://127.0.0.1:5050/";
const COMMAND_ENDPOINT = "http://127.0.0.1:5252/";

const line_chart_data = {
  temp: [0,1,2,3,4],
  volt: [0,1,2,3,4], 
  alt: [0,1,2,3,4],
  press: [0,1,2,3,4],
  rev: [0,1,2,3,4],
  speed: [0,1,2,3,4],
}


function App() {
  const [currentData, setCurrentData] = useState(line_chart_data);
  const [currentLabel, setCurrentLabel] = useState([1, 2, 3, 4, 5]);
  const [response_c, setResponse_c] = useState("");
  const [response_t, setResponse_t] = useState("");
  const [telem_on_off, setTelem_on_off] = useState(0);
  const [pop_up_state, set_pop_up_state] = useState(0)
  const [time, setTime] = useState()
  const [baudrate, setBaudrate] = useState(9600)

  

  const setTelemOnOffHandler = () => {
    const socket_command = socketIOClient(COMMAND_ENDPOINT);
    if(telem_on_off === 0){
      socket_command.emit("send_command", 1)
      setTelem_on_off(1)
    }else{
      socket_command.emit("send_command", 0)
      setTelem_on_off(0)
    }
  }

  const setTimeHandler = () => {
    if( pop_up_state === 0){
      set_pop_up_state(1)
    }
    else{
      set_pop_up_state(0)
    }
  }

  const setBaudHandler = () => {
    if( pop_up_state === 0){
      set_pop_up_state(2)
    }
    else{
      set_pop_up_state(0)
    }
  }

  useEffect(() => {

    const socket_c = socketIOClient(ENDPOINT_C);
    socket_c.on("FromC", (data) => {
      setResponse_c(data);
    });

    const socket_t = socketIOClient(ENDPOINT_T);
    socket_t.on("FromT", (data) => {
      setResponse_t(data);
      
    });
    
  }, [telem_on_off]);



  const dataChangeHandler = () => {
    setCurrentData((prev) => {
      //const updated = [...prev, response.C_TEAM_ID];
      prev.alt = [prev.alt[1], prev.alt[2], prev.alt[3], prev.alt[4],  response_c.ALTITUDE];
      prev.temp = [prev.temp[1], prev.temp[2], prev.temp[3], prev.temp[4],  response_c.TEMP];
      prev.volt = [prev.volt[1], prev.volt[2], prev.volt[3], prev.volt[4],  response_c.VOLTAGE];
      prev.press = [prev.press[1], prev.press[2], prev.press[3], prev.press[4],  response_c.X_PRESSURE];
      prev.rev = [prev.rev[1], prev.rev[2], prev.rev[3], prev.rev[4],  response_c.X_REVOLUTION];
      prev.speed = [prev.speed[1], prev.speed[2], prev.speed[3], prev.speed[4],  response_c.X_SPEED];
      return prev;
    });
  };

  

  const labelChangeHandler = () => {
    setCurrentLabel((prev) => {
      const incremented = prev[4] + 1;
      return [prev[1], prev[2], prev[3], prev[4], incremented];
    });
  };


  return (
    <div className="App">
      {pop_up_state===2 ? <BaudInput dismiss={setBaudHandler} setBaudrate={setBaudrate}></BaudInput> : console.log()}
      {pop_up_state===1 ? <TimeInput dismiss={setTimeHandler} setTime={setTime}></TimeInput> : console.log()}
     
      <div className="functional-elements">
        <div className="card-container">
          
          <div className="card">
            <Map />
          </div>
        </div>

      </div>
    </div>
  );
}

export default App;
