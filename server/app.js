const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

const port_c = process.env.PORT || 4848;
const port_t = process.env.PORT || 5050;
const command_port = process.env.PORT || 5252;
const index = require("./routes/index");

const app = express();
app.use(index);

app.all("/*", function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

const server_c = http.createServer(app);
const server_t = http.createServer(app);
const command_server = http.createServer(app)

const io_c = socketIo(server_c);
const io_t = socketIo(server_t);
const io_command = socketIo(command_server)

let interval_c;
let interval_t;
let interval_command;
let package_count_c = 0;
let package_count_t = 0;

let telem_on_off = 1



io_c.on("connection", (socket) => {
  console.log(`New client connected ${port_c}`);
  if (interval_c) {
    clearInterval(interval_c);
  }

  if(telem_on_off == 1){
    interval_c = setInterval(() => emit_packet_c(socket, package_count_c), 1000);
  }

  socket.on("disconnect", () => {
    console.log("Client disconnected");
    clearInterval(interval_c);
  });
});

io_t.on("connection", (socket) => {
  console.log(`New client connected ${port_t}`);
  if (interval_t) {
    clearInterval(interval_t);
  }
  if(telem_on_off == 1){
    interval_t = setInterval(() => emit_packet_t(socket, package_count_t), 250);
  }


  socket.on("disconnect", () => {
    console.log("Client disconnected");
    clearInterval(interval_t);
  });
});

io_command.on("connection", (socket) => {
  console.log(`New client connected ${command_port}`);
  if (interval_command) {
    clearInterval(interval_command);
  }

  socket.on("send_command", (data) => {
    console.log(data);
    telem_on_off = data
  })

  socket.on("disconnect", () => {
    console.log("Client disconnected");
    clearInterval(interval_command);
  });
});


const emit_packet_t = (socket, n) => {
  const response = {

    T_TEAM_ID: 17,
    T_MISSION_TIME: 18,
    T_PACKET_COUNT: package_count_t,
    T_PACKET_TYPE: "T",
    T_TP_ALTITUDE: 21, // relative to ground level.The resolution must be 0.1 
    T_TP_TEMP: 22,
    T_TP_VOLTAGE: 23,
    T_GYRO_R: 24 + n/2,// degrees per second
    T_GYRO_P: 25 + n/2,
    T_GYRO_Y: 26 + n/2,
    T_ACCEL_R: 27,
    T_ACCEL_P: 28,
    T_ACCEL_Y: 29,
    T_MAG_R: 30,
    T_MAG_P: 31,
    T_MAG_Y: 32,
    T_POINTING_ERROR: 33,
    T_TP_SOFTWARE_STATE: "STANDBY", // STANDBY, RELEASED, ACQUIRING_TARGET, TARGET_POINTING, etc.

  };
  // Emitting a new message. Will be consumed by the client
  socket.emit("FromT", response);
  package_count_t++;
};

const emit_packet_c = (socket, n) => {
  const response = {
    C_TEAM_ID: 1000,
    C_MISSION_TIME: 2, // UTC format
    C_PACKET_COUNT: 0 + n,
    C_PACKET_TYPE: "C",
    C_MODE: "F", // F for flight S for simulation
    C_TP_RELEASED: "N", //  ‘N’ for not released and ‘R’ for released
    C_ALTITUDE: 7, // resolution must be 0.1 meters. Relative to ground
    C_TEMP: 8, // is the temperature in degrees Celsius with a resolution of 0.1 degrees C.
    C_VOLTAGE: 9, // The resolution must be 0.01 volts.
    C_GPS_TIME: 10, // UTC and have a resolution of a second.
    C_GPS_LATITUDE: 11, // with a resolution of 0.0001 degrees
    C_GPS_LONGITUDE: 12,
    C_GPS_ALTITUDE: 13, // sea level with a resolution of 0.1 meters.
    C_GPS_SATS: 14,// number of GPS satellites
    C_SOFTWARE_STATE: "LAUNCH_WAIT", // e.g., LAUNCH_WAIT,
    //ASCENT, ROCKET_SEPARATION, DESCENT, TP_RELEASE, LANDED, etc.
    C_CMD_ECHO: "CMD,1000,CX,ON",
    //Example: The command CMD,1000,CX,ON activates Container telemetry
    //transmission, assuming the team id is 1000.
    //CMD,<TEAM_ID>,ST,<UTC_TIME> CMD,1000,ST,13:35:59
    //CMD,<TEAM_ID>,SIM,<MODE>  mods: ‘ENABLE’  ‘ACTIVATE’  ‘DISABLE’
    //CMD,<TEAM ID>,SIMP,<PRESSURE> (101325 Pascals = approximately sea level).

    X_SPEED: 35,
    X_REVOLUTION: 36,
    X_PRESSURE: 37
  };
  // Emitting a new message. Will be consumed by the client
  socket.emit("FromC", response);
  package_count_c++;
};

server_c.listen(port_c, () => console.log(`Listening on port ${port_c}`));
server_t.listen(port_t, () => console.log(`Listening on port ${port_t}`));
command_server.listen(command_port, () => console.log(`Listening on port ${command_port}`));

