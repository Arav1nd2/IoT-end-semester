// MQTT broker
var mosca = require('mosca')
var settings = {port: 1883}
var broker = new mosca.Server(settings)

// MongoDB
var mongo = require('mongodb')
var mongc = mongo.MongoClient
var url = 'mongodb://localhost:27017/iot'

broker.on('ready', ()=>{
    console.log('Broker is ready!')
})


broker.on('clientConnected', () => {
    console.log('client connected...')
})

broker.on('published', (packet)=>{
    message = packet.payload.toString()
    console.log(message)
    if(message.slice(0,1) != '{' && message.slice(0,4) != 'mqtt'){
        mongc.connect(url, (error, client)=>{
            var myCol = client.db('iot').collection(packet.topic)
            myCol.insertOne({
                message: message
            }, ()=>{
                console.log('Data is saved to MongoDB')
                client.close()
            })
        })
    }
})
