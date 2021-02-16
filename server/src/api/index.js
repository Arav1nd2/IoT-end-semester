    const express = require('express')
    const createNewSensor = require('../../utils/createSensor')
    const createNewJoin = require("../../utils/createJoin")
    const createNewActuator = require('../../utils/createActuator')
    const cors = require('cors')

    const {series} = require('async');
    const {exec} = require('child_process');

    const app = express()


    app.use(express.json())
    app.use(express.urlencoded())
    app.use(cors())

    app.get("/api", (req, res) => {
        res.json({message: "IoTspeak api"})
    })

    app.post('/api/sensor', async (req, res) => {
        const {topic, sample} = req.body;
        await createNewSensor("mqtt://localhost:1234", topic, topic.toLowerCase(), sample, res)
        res.json({
            message: "Sensor created!",
            topic
        })
    })

    app.post('/api/join', async (req, res) => {
        const {joinId, sensors, code} = req.body;
        code.replace("\&gt;", ">")
        code.replace("\&lt;", "<")
        code.replace("\&amp;", "&")
        await createNewJoin("mqtt://localhost:1234", joinId, joinId.toLowerCase(), sensors, code, res)
        res.json({
            message: "Join created!",
            joinId
        })
    })

    app.post('/api/actuator', async (req, res) => {
        const {topic, filename } = req.body;
        await createNewActuator("mqtt://localhost:1234", topic, filename, res)
        res.json({
            message: "Actuator created!",
            topic
        })
    })


    app.listen(5000, () => {
        console.log("Express server running in port 5000")
    })