import React from "react";
import "./telemData.css";



const TelemData = (props) => {
  return (
    <div className="data-container">
      <div className="left-side">
        <div><pre className="data-text">C_TEAM_ID        : {props.telemetry_c.TEAM_ID}</pre></div>
        <div><pre className="data-text">C_MISSION_TIME   : {props.telemetry_c.MISSION_TIME}</pre></div>
        <div><pre className="data-text">C_PACKET_COUNT   : {props.telemetry_c.PACKET_COUNT}</pre></div>
        <div><pre className="data-text">C_PACKET_TYPE    : {props.telemetry_c.PACKET_TYPE}</pre></div>
        <div><pre className="data-text">C_MODE           : {props.telemetry_c.MODE}</pre></div>
        <div><pre className="data-text">C_TP_RELEASED    : {props.telemetry_c.TP_RELEASED}</pre></div>
        <div><pre className="data-text">C_ALTITUDE       : {props.telemetry_c.ALTITUDE}</pre></div>
        <div><pre className="data-text">C_TEMP           : {props.telemetry_c.TEMP}</pre></div>
        <div><pre className="data-text">C_VOLTAGE        : {props.telemetry_c.VOLTAGE}</pre></div>
        <div><pre className="data-text">C_GPS_TIME       : {props.telemetry_c.GPS_TIME}</pre></div>
        <div><pre className="data-text">C_GPS_LATITUDE   : {props.telemetry_c.GPS_LATITUDE}</pre></div>
        <div><pre className="data-text">C_GPS_LONGITUDE  : {props.telemetry_c.GPS_LONGITUDE}</pre></div>
        <div><pre className="data-text">C_GPS_ALTITUDE   : {props.telemetry_c.GPS_ALTITUDE}</pre></div>
        <div><pre className="data-text">C_GPS_SATS       : {props.telemetry_c.GPS_SATS}</pre></div>
        <div><pre className="data-text">C_SOFTWARE_STATE : {props.telemetry_c.SOFTWARE_STATE}</pre></div>
        <div><pre className="data-text">C_CMD_ECHO       : {props.telemetry_c.CMD_ECHO}</pre></div>
      </div>
      <div className="right-side">
        <div><pre className="data-text">T_TEAM_ID           : {props.telemetry_t.TEAM_ID}</pre></div>
        <div><pre className="data-text">T_MISSION_TIME      : {props.telemetry_t.MISSION_TIME}</pre></div>
        <div><pre className="data-text">T_TP_SOFTWARE_STATE : {props.telemetry_t.TP_SOFTWARE_STATE}</pre></div>
        <div><pre className="data-text">T_POINTING_ERROR    : {props.telemetry_t.POINTING_ERROR}</pre></div>
        <div><pre className="data-text">T_TP_ALTITUDE       : {props.telemetry_t.TP_ALTITUDE}</pre></div>
        <div><pre className="data-text">T_TP_TEMP           : {props.telemetry_t.TP_TEMP}</pre></div>
        <div><pre className="data-text">T_TP_VOLTAGE        : {props.telemetry_t.TP_VOLTAGE}</pre></div>
        <div><pre className="data-text">T_GYRO_R            : {props.telemetry_t.GYRO_R}</pre></div>
        <div><pre className="data-text">T_GYRO_P            : {props.telemetry_t.GYRO_P}</pre></div>
        <div><pre className="data-text">T_GYRO_Y            : {props.telemetry_t.GYRO_Y}</pre></div>
        <div><pre className="data-text">T_ACCEL_R           : {props.telemetry_t.ACCEL_R}</pre></div>
        <div><pre className="data-text">T_ACCEL_P           : {props.telemetry_t.ACCEL_P}</pre></div>
        <div><pre className="data-text">T_ACCEL_Y           : {props.telemetry_t.ACCEL_Y}</pre></div>
        <div><pre className="data-text">T_MAG_R             : {props.telemetry_t.MAG_R}</pre></div>
        <div><pre className="data-text">T_MAG_P             : {props.telemetry_t.MAG_P}</pre></div>
        <div><pre className="data-text">T_MAG_Y             : {props.telemetry_t.MAG_Y}</pre></div>

      </div>
    </div>
  );
};

export default TelemData;
