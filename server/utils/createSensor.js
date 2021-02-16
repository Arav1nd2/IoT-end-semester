const fs = require('fs');
const Handlebars = require('handlebars');



async function createNewSensor(connectionString, topicName, filename, sampleValue, res = null) {
    var source = '';
    
    const readStream = fs.createReadStream('./utils/templates/sensor.txt', 'utf8');
    
    readStream.on('data', function(chunk) {
        source += chunk;
    }).on('end', function() {
        const template = Handlebars.compile(source)
        const newSensor = template({
            connectionString: connectionString,
            topicName: topicName,
            sampleValue: sampleValue
        })
        fs.writeFile(`./src/sensors/${filename}.js`, newSensor, (err) => {
            if(err) {
                console.log(`Error creating new sensor, ${err.message}`)
                if(res) {
                    return res.json({message: `Error creating new sensor, ${err.message}`})
                } else {
                    return;
                }
            }
            console.log("Created new sensor")
        })
    });
}

// createNewSensor("mqtt://localhost:1234", "pH", "ph", 6.1)
// createNewSensor("mqtt://localhost:1234", "temperature", "temperature", 28.4)

module.exports = createNewSensor;