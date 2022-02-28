const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

var SerialPort = require("serialport");


//var com_port_list = () => {
//  let ports_list = ["/dev/ttyUSB0"]
//  SerialPort.list().then(async function(ports){
//  
//    ports.forEach(await function(port){
//      ports_list.push(port.path);
//      
//    })
//    console.log(ports_list)
//    return ports_list;
//  });
//  
//};
//
//var ports_list = com_port_list();
//console.log(ports_list)
ports_list = ["/dev/ttyUSB0"]

var serialPort = new SerialPort(ports_list[0], {
  baudRate: 9600,
  parser: new SerialPort.parsers.Readline("\n"),
});



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
  
    if(telem_on_off === 1){
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
    if(telem_on_off === 1){
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
      //console.log(data);
      telem_on_off = data
    })
  
    socket.on("disconnect", () => {
      console.log("Client disconnected");
      clearInterval(interval_command);
    });
  });

var bit8ToUInt = (hex1) => {

  let power1 = Math.floor(hex1 / 16);
  let power0 = hex1 % 16;

  let result =
    Math.pow(16, 1) * power1 +
    Math.pow(16, 0) * power0;
  return result;
};

var bit16ToUInt = (hex1, hex2) => {
  let power3 = Math.floor(hex2 / 16);
  let power2 = hex2 % 16;

  let power1 = Math.floor(hex1 / 16);
  let power0 = hex1 % 16;

  let result =
    Math.pow(16, 3) * power3 +
    Math.pow(16, 2) * power2 +
    Math.pow(16, 1) * power1 +
    Math.pow(16, 0) * power0;
  return result;
};

var bit16ToInt = (hex1, hex2) => {
    let power3 = Math.floor(hex2 / 16);
    let power2 = hex2 % 16;
  
    let power1 = Math.floor(hex1 / 16);
    let power0 = hex1 % 16;
  
    let result =
      Math.pow(16, 3) * power3 +
      Math.pow(16, 2) * power2 +
      Math.pow(16, 1) * power1 +
      Math.pow(16, 0) * power0;

    if (result > Math.pow(2,15)){
        result = -(Math.pow(2,16)-result)
    }
    return result;
  };

var bit32ToUInt = (hex1, hex2, hex3, hex4) => {
  let power7 = Math.floor(hex4 / 16);
  let power6 = hex4 % 16;

  let power5 = Math.floor(hex3 / 16);
  let power4 = hex3 % 16;

  let power3 = Math.floor(hex2 / 16);
  let power2 = hex2 % 16;

  let power1 = Math.floor(hex1 / 16);
  let power0 = hex1 % 16;

  let result =
    Math.pow(16, 7) * power7 +
    Math.pow(16, 6) * power6 +
    Math.pow(16, 5) * power5 +
    Math.pow(16, 4) * power4 +
    Math.pow(16, 3) * power3 +
    Math.pow(16, 2) * power2 +
    Math.pow(16, 1) * power1 +
    Math.pow(16, 0) * power0;
  return result;
};

var bit32ToInt = (hex1, hex2, hex3, hex4) => {
    let power7 = Math.floor(hex4 / 16);
    let power6 = hex4 % 16;
  
    let power5 = Math.floor(hex3 / 16);
    let power4 = hex3 % 16;
  
    let power3 = Math.floor(hex2 / 16);
    let power2 = hex2 % 16;
  
    let power1 = Math.floor(hex1 / 16);
    let power0 = hex1 % 16;
  
    let result =
      Math.pow(16, 7) * power7 +
      Math.pow(16, 6) * power6 +
      Math.pow(16, 5) * power5 +
      Math.pow(16, 4) * power4 +
      Math.pow(16, 3) * power3 +
      Math.pow(16, 2) * power2 +
      Math.pow(16, 1) * power1 +
      Math.pow(16, 0) * power0;

    if (result > Math.pow(2,31)){
        result = -(Math.pow(2,32)-result)
    }

    return result;
  };

var intToChar = (code) => {
  return String.fromCharCode(code);
};

function parseFloat(hex1, hex2, hex3, hex4) {
  
  str = "0x"+intToHex(hex4) + intToHex(hex3) + intToHex(hex2) + intToHex(hex1)
  var float = 0, sign, mantissa, exp,
  int = 0, multi = 1;
  if (/^0x/.exec(str)) {
      int = parseInt(str, 16);
  }
  else {
      for (var i = str.length -1; i >=0; i -= 1) {
          if (str.charCodeAt(i) > 255) {
              console.log('Wrong string parameter');
              return false;
          }
          int += str.charCodeAt(i) * multi;
          multi *= 256;
      }
  }
  sign = (int >>> 31) ? -1 : 1;
  exp = (int >>> 23 & 0xff) - 127;
  mantissa = ((int & 0x7fffff) + 0x800000).toString(2);
  for (i=0; i<mantissa.length; i+=1) {
      float += parseInt(mantissa[i]) ? Math.pow(2, exp) : 0;
      exp--;
  }
  return float*sign;
}

function intToHex(int){
  secondDigit = int % 16
  firstDigit = (int - secondDigit)/16
  result = ""

  if (firstDigit > 9){
    if(firstDigit === 10){
      result += "a"
    }
    if(firstDigit === 11){
      result += "b"
    }
    if(firstDigit === 12){
      result += "c"
    }
    if(firstDigit === 13){
      result += "d"
    }
    if(firstDigit === 14){
      result += "e"
    }
    if(firstDigit === 15){
      result += "f"
    }
  }else{
    result += firstDigit
  }

  if (secondDigit > 9){
    if(secondDigit === 10){
      result += "a"
    }
    if(secondDigit === 11){
      result += "b"
    }
    if(secondDigit === 12){
      result += "c"
    }
    if(secondDigit === 13){
      result += "d"
    }
    if(secondDigit === 14){
      result += "e"
    }
    if(secondDigit === 15){
      result += "f"
    }
  }else{
    result += secondDigit
  }

  return result
}

var t_package = {

  TEAM_ID: 17,
  MISSION_TIME: 18,
  PACKET_COUNT: 0,
  PACKET_TYPE: "T",
  TP_ALTITUDE: 21, // relative to ground level.The resolution must be 0.1 
  TP_TEMP: Math.round(Math.random()*4*1000)/1000,
  TP_VOLTAGE: Math.round(Math.random()*4*1000)/1000,
  GYRO_R: 24 ,// degrees per second
  GYRO_P: 25 ,
  GYRO_Y: 26 ,
  ACCEL_R: 27,
  ACCEL_P: 28,
  ACCEL_Y: 29,
  MAG_R: 30,
  MAG_P: 31,
  MAG_Y: 32,
  POINTING_ERROR: 33,
  TP_SOFTWARE_STATE: "STANDBY", // STANDBY, RELEASED, ACQUIRING_TARGET, TARGET_POINTING, etc.

};



var c_package = {
  TEAM_ID: 1018,
  MISSION_TIME: 2, // UTC format
  PACKET_COUNT: 0,
  PACKET_TYPE: "C",
  MODE: "F", // F for flight S for simulation
  TP_RELEASED: "N", //  ‘N’ for not released and ‘R’ for released
  ALTITUDE: Math.round(Math.random()*4*1000)/1000, // resolution must be 0.1 meters. Relative to ground
  TEMP: Math.round(Math.random()*4*1000)/1000, // is the temperature in degrees Celsius with a resolution of 0.1 degrees C.
  VOLTAGE: Math.round(Math.random()*4*1000)/1000, // The resolution must be 0.01 volts.
  GPS_TIME: 10, // UTC and have a resolution of a second.
  GPS_LATITUDE: 11, // with a resolution of 0.0001 degrees
  GPS_LONGITUDE: 12,
  GPS_ALTITUDE: 13, // sea level with a resolution of 0.1 meters.
  GPS_SATS: 14,// number of GPS satellites
  SOFTWARE_STATE: "LAUNCH_WAIT", // e.g., LAUNCH_WAIT,
    //ASCENT, ROCKET_SEPARATION, DESCENT, TP_RELEASE, LANDED, etc.
  CMD_ECHO: "CMD,1000,CX,ON",
  //Example: The command CMD,1000,CX,ON activates Container telemetry
  //CMD,<TEAM_ID>,ST,<UTC_TIME> CMD,1000,ST,13:35:59
  //CMD,<TEAM_ID>,SIM,<MODE>  mods: ‘ENABLE’  ‘ACTIVATE’  ‘DISABLE’
  //CMD,<TEAM ID>,SIMP,<PRESSURE> (101325 Pascals = approximately sea level).

  X_SPEED: Math.round(Math.random()*4*1000)/1000,
  X_REVOLUTION: Math.round(Math.random()*4*1000)/1000,
  X_PRESSURE: Math.round(Math.random()*4*1000)/1000
};


serialPort.on("open", function () {
  console.log("open");
  serialPort.on("data", function (data) {
    var teamId = bit32ToInt(data[0],data[1], data[2], data[3]);
    var hour=bit8ToUInt(data[4]);
    var minute=bit8ToUInt(data[5]);
    var second=bit8ToUInt(data[6]);
    var milisecond=bit8ToUInt(data[7]);
    var packageCount=bit16ToUInt(data[8], data[9]);
    var packetType=intToChar(bit8ToUInt(data[10]));

    var mode=intToChar(bit8ToUInt(data[11]));
    var tpReleased=intToChar(bit8ToUInt(data[12]));
    var altitude=bit16ToUInt(data[13], data[14]);
    var temp=bit16ToUInt(data[15], data[16]);
    var voltage=bit16ToUInt(data[17], data[18]);
    var GPS_hour=bit8ToUInt(data[19]);
    var GPS_minute=bit8ToUInt(data[20]);
    var GPS_second=bit8ToUInt(data[21]);                             

    


    var GPS_latitude=parseFloat(data[22], data[23], data[24], data[25])
    var GPS_longitude=parseFloat(data[26], data[27], data[28], data[29])

    var GPS_altitude=bit16ToUInt(data[30], data[31]);

    c_package.TEAM_ID = teamId
    t_package.TEAM_ID = teamId

    c_package.PACKET_COUNT = packageCount
    t_package.PACKET_COUNT = packageCount

    c_package.MODE = mode
    c_package.TP_RELEASED = tpReleased

    c_package.ALTITUDE= altitude
    c_package.TEMP = temp
    c_package.VOLTAGE = voltage

    t_package.TP_ALTITUDE= altitude
    t_package.TP_TEMP = temp
    t_package.TP_VOLTAGE = voltage

    //console.log(data);//packet type
  });
});


const emit_packet_t = (socket, n) => {
    const response = t_package
    //console.log(t_package.PACKET_COUNT)
    // Emitting a new message. Will be consumed by the client
    socket.emit("FromT", response);
    
  };
  
  const emit_packet_c = (socket, n) => {
    const response = c_package
    // Emitting a new message. Will be consumed by the client
    socket.emit("FromC", response);
  };
  
  server_c.listen(port_c, () => console.log(`Listening on port ${port_c}`));
  server_t.listen(port_t, () => console.log(`Listening on port ${port_t}`));
  command_server.listen(command_port, () => console.log(`Listening on port ${command_port}`));
  