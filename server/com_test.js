const SerialPort = require('serialport');


var com_port_list = async() => {
    let ports_list = []
    await SerialPort.list().then(async function(ports){
    
      ports.forEach( function(port){
        ports_list.push(port.path);
        
      })
      console.log(ports_list)
      return ports_list;
    }); 
};

await new Promise(r => setTimeout(r, 2000));

var ports_list = com_port_list()

console.log("ports_list")