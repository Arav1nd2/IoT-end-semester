const fs = require('fs');
const Handlebars = require('handlebars');



async function createNewActuator(connectionString, topicName, filename, res=null) {
    var source = '';
    
    const readStream = fs.createReadStream('./utils/templates/actuator.txt', 'utf8');
    
    readStream.on('data', function(chunk) {
        source += chunk;
    }).on('end', function() {
        const template = Handlebars.compile(source)
        const newSensor = template({
            connectionString: connectionString,
            topicName: topicName,
        })
        fs.writeFile(`./src/actuators/${filename}.js`, newSensor, (err) => {
            if(err) {
                console.log(`Error creating new actuator, ${err.message}`)
                if(res) {
                    return res.json({
                        message: `Error creating new actuator, ${err.message}`
                    })
                }
                return;
            }
            console.log("Created new actuator")
        })
    });
}

// createNewActuator("mqtt://localhost:1234", "join1", "bulb")
// createNewActuator("mqtt://localhost:1234", "join2", "fan")
module.exports = createNewActuator