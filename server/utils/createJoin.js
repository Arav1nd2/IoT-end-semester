const fs = require('fs');
const Handlebars = require('handlebars');



async function createNewJoin(connectionString, joinId, filename, sensorList, code, res=null) {
    var source = '';
    var codeRAW = '';
    
    const readStream = fs.createReadStream('./utils/templates/join.txt', 'utf8');
    const codeReadStream = fs.createReadStream('./utils/templates/code.txt', 'utf-8');
    
    codeReadStream.on('data', chunk => {
        codeRAW += chunk
    }).on('end', () => {
        const codeTemplate = Handlebars.compile(codeRAW)
        const codeContents = codeTemplate({
            functionName: `${filename}Runner`,
            args: `{${sensorList.split(":").join(" , ")}}`,
            code: code
        })
        fs.writeFile(`./src/join/runners/${filename}Runner.js`, codeContents, (err) => {
            if(err) {
                console.log(err);
                if(res) {
                    return res.json({
                        message: `Error creating new join, ${err.message}`
                    })
                }
                return
            }
            readStream.on('data', function(chunk) {
                source += chunk;
            }).on('end', function() {
                const template = Handlebars.compile(source)
                const newSensor = template({
                    connectionString: connectionString,
                    joinId: joinId,
                    sensorList: sensorList,
                    runnerName: `${filename}Runner`
                })
        
                fs.writeFile(`./src/join/${filename}.js`, newSensor, 'ascii' ,(err) => {
                    if(err) {
                        console.log(`Error creating new join, ${err.message}`)
                        if(res) {
                            return res.json({
                                message: `Error creating new join, ${err.message}`
                            })
                        }
                        return
                    }
                    console.log("Created new join")
                })
            });
        })
        
    })



}

// createNewActuator("mqtt://localhost:1234", "join1", "join2", "pH", `
//     return pH*110;
// `)
// createNewActuator("mqtt://localhost:1234", "join2", "join3", "pH:temperature", `    
//     return pH*temperature;
// `)

module.exports = createNewJoin