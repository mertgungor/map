//username 1018
//password Noelgara865

const mqtt = require('mqtt')

//const mqtt_host = 'broker.emqx.io'
//const mqtt_port = '1883'

//const mqtt_host = 'tee24ecb-internet-facing-10924c824a455b5b.elb.us-east-1.amazonaws.com'
const mqtt_host = "https://mosquitto.org/"
const mqtt_port = '1883'

const mqtt_clientId = `mqtt_${Math.random().toString(16).slice(3)}`

const mqtt_connectUrl = `mqtt://${mqtt_host}:${mqtt_port}`
const mqtt_client = mqtt.connect(mqtt_connectUrl, {
  mqtt_clientId,
  clean: true,
  connectTimeout: 4000,
  username: '1018',
  password: 'Noelgara865',
  reconnectPeriod: 1000,
})


var test = {
  test1: 1,
  test2: 2
}
console.log(JSON.stringify(test))

const topic = '/teams/1018'
mqtt_client.on('connect', () => {
  console.log('Connected')
  mqtt_client.subscribe([topic], () => {
    console.log(`Subscribe to topic '${topic}'`)
  })
  mqtt_client.publish(topic, JSON.stringify(test), { qos: 0, retain: false }, (error) => {
    if (error) {
      console.error(error)
    }
  })
})
mqtt_client.on('message', (topic, payload) => {
  console.log('Received Message:', topic, payload.toString())
})
