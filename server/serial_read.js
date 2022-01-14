var SerialPort = require("serialport");

var serialPort = new SerialPort("/dev/ttyUSB0", {
  baudRate: 9600,
  parser: new SerialPort.parsers.Readline("\n"),
});

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

var readData = "";

serialPort.on("open", function () {
  console.log("open");
  serialPort.on("data", function (data) {
    console.log(bit32ToInt(data[0],data[1], data[2], data[3]));
    console.log(data);
    readData += data.toString();
  });
});
