const sensors = "pH:temp".split(":")
const joinId = 'bulb1'

var mongo = require('mongodb')
var mongc = mongo.MongoClient
var url = 'mongodb://localhost:27017/iot'

var mqtt = require('mqtt')
var mqttclient = mqtt.connect("mqtt://localhost:1883")


let dbClient;
mongc.connect(url, (error, client)=>{
    if(error) {
        console.log(error.message)
    }
    dbClient = client
})

const runner = require('./runners/bulb1Runner.js')

setInterval(async () => {
    args = {}
    for (sensor in sensors) {
        const data = await dbClient.db('iot').collection(sensors[sensor]).find().sort({_id: -1}).limit(1).toArray();
        let info = data[0].message
        if(isNaN(info))
            args[sensors[sensor]] = data[0].message
        else 
            args[sensors[sensor]] = parseFloat(info)
    }
    try {
        let res = runner(args);
        Promise.resolve(res).then((resp) => {
            console.log(resp)
            mqttclient.publish(joinId, resp.toString())
        })
    } catch(err) {
        console.log(err.message)
    }
}, 3000)