

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
  

const items = c_package.items
const replacer = (key, value) => value === null ? '' : value // specify how you want to handle null values here
const header = Object.keys(items[0])
const csv = [
  header.join(','), // header row first
  ...items.map(row => header.map(fieldName => JSON.stringify(row[fieldName], replacer)).join(','))
].join('\r\n')

console.log(csv)