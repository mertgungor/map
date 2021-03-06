var SerialPort = require("serialport");

var serialPort = new SerialPort("/dev/ttyUSB0", {
  baudRate: 9600,
  parser: new SerialPort.parsers.Readline("\n"),
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

const t_package = {

  TEAM_ID: 17,
  MISSION_TIME: 18,
  PACKET_COUNT: package_count_t,
  PACKET_TYPE: "T",
  TP_ALTITUDE: 21, // relative to ground level.The resolution must be 0.1 
  TP_TEMP: Math.round(Math.random()*4*1000)/1000,
  TP_VOLTAGE: Math.round(Math.random()*4*1000)/1000,
  GYRO_R: 24 + n/2,// degrees per second
  GYRO_P: 25 + n/2,
  GYRO_Y: 26 + n/2,
  ACCEL_R: 27,
  ACCEL_P: 28,
  ACCEL_Y: 29,
  MAG_R: 30,
  MAG_P: 31,
  MAG_Y: 32,
  POINTING_ERROR: 33,
  TP_SOFTWARE_STATE: "STANDBY", // STANDBY, RELEASED, ACQUIRING_TARGET, TARGET_POINTING, etc.

};


var readData = "";

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
    //console.log(bit8ToUInt(data[4]));
    //console.log(bit8ToUInt(data[4]));

    //console.log(bit8ToUInt(data[4]));
    //console.log(bit8ToUInt(data[4]));
    //console.log(bit8ToUInt(data[4]));

    console.log(data);//packet type
    console.log("--------------")
    readData += data.toString();
  });
});
