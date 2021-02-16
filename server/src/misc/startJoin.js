const fs = require('fs')
const exec = require('child_process').exec

const async = require('async') // npm install async 

const scriptsFolder = './src/join/' // add your scripts to folder named scripts

const files = fs.readdirSync(scriptsFolder) // reading files from folders
console.log(files)
const funcs = []
files.forEach(function(file) {
  if(file.split('.').length === 1) {
    return;
  }
  funcs.push(exec.bind(null, `node ${scriptsFolder}${file}`)) // execute node command
})

function getResults(err, data) {
  if (err) {
    return console.log(err)
  }
  const results = data.map(function(lines){
    return lines.join('') // joining each script lines
  })
  console.log(results)
}

// to run your scipts in parallel use
async.parallel(funcs, getResults)