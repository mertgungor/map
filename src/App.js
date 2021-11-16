import "./App.css";
import React, { useState, useEffect } from "react";
import socketIOClient from "socket.io-client";
import Button from "./components/Button/Button";
import Cam from "./components/Cam/Cam";
import TelemData from "./components/TelemData/TelemData";
import Map from "./components/Map/Map";
import LineChart from "./components/LineChart/LineChart";
import Cube from "./components/Cube/Cube";

const ENDPOINT = "http://127.0.0.1:4848/";

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
  const [response, setResponse] = useState("");

  useEffect(() => {
    const socket = socketIOClient(ENDPOINT);
    socket.on("FromC", (data) => {
      setResponse(data);
    });
  }, []);

  const dataChangeHandler = () => {
    setCurrentData((prev) => {
      //const updated = [...prev, response.C_TEAM_ID];
      prev.alt = [prev.alt[1], prev.alt[2], prev.alt[3], prev.alt[4],  response.C_ALTITUDE];
      prev.temp = [prev.temp[1], prev.temp[2], prev.temp[3], prev.temp[4],  response.C_TEMP];
      prev.volt = [prev.volt[1], prev.volt[2], prev.volt[3], prev.volt[4],  response.C_VOLTAGE];
      prev.press = [prev.press[1], prev.press[2], prev.press[3], prev.press[4],  response.X_PRESSURE];
      prev.rev = [prev.rev[1], prev.rev[2], prev.rev[3], prev.rev[4],  response.X_REVOLUTION];
      prev.speed = [prev.speed[1], prev.speed[2], prev.speed[3], prev.speed[4],  response.X_SPEED];
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
      <div className="sidebar">
        <Button />
      </div>
      <div className="functional-elements">
        <div className="card-container">
          <div className="card">
            <TelemData telemetry={response}/>
          </div>
          <div className="card">
              <Cube data={response} roll={response.T_GYRO_R} pitch={response.T_GYRO_P} yaw={response.T_GYRO_Y}/>
          </div>
          <div className="card">
            <Map />
          </div>
        </div>
        <div className="graph-and-cam-container">
          <div className="graph">
            <div className="graph2">
              <LineChart
                label="temperature"
                dataArray={currentData.temp}
                labels={currentLabel}
              ></LineChart>
              <LineChart
                label="pressure"
                dataArray={currentData.press}
                labels={currentLabel}
              ></LineChart>
            </div>

            <div className="graph2">
              <LineChart
                label="battery voltage"
                dataArray={currentData.volt}
                labels={currentLabel}
              ></LineChart>
              <LineChart
                label="revolution"
                dataArray={currentData.rev}
                labels={currentLabel}
              ></LineChart>
            </div>

            <div className="graph2">
              <LineChart
                label="altitude"
                dataArray={currentData.alt}
                labels={currentLabel}
              ></LineChart>
              <LineChart
                label="speed"
                dataArray={currentData.speed}
                labels={currentLabel}
              ></LineChart>
            </div>
          </div>
          
          {useEffect(() => {
              dataChangeHandler();
              labelChangeHandler();
          }, [response])} 

          <div className="cam-container">
            <Cam />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
