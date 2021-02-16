// MQTT publisher
var mqtt = require('mqtt')
var client = mqtt.connect("mqtt://localhost:1883")
var topic = "pH"
var message = '7.1'

client.on('connect', ()=>{
    setInterval(()=>{
        client.publish(topic, message)
        console.log('Message sent!', message)
    }, 5000)
})