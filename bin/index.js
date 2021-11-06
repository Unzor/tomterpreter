#!/usr/bin/env node
if (process.argv[2]){
  var toml = require('toml');
  if (require('fs').existsSync(process.argv[2])) {
var json = toml.parse(require('fs').readFileSync(process.argv[2]).toString());
  } else {
     console.log(require('chalk').red('TOMTERPRETER ERR! ') + "File not found! Exiting..")
     process.exit(1);
  }
var logger = {},
consoole = {};
console.defaultLog = console.log.bind(console);
console.logs = [];
consoole.log = function(){
    // new & array data
    console.logs.push(Array.from(arguments));
}
logger.getLogs=function(){
  return console.logs;
}
logger.clear=function(){
  console.logs=[];
}

var Basic = require('../pg-basic/basic.js')
var interpreter = new Basic({
  console: consoole,
  debugLevel: 99
});
function int(c, t){
interpreter.run(c).then(() => {
            logger.getLogs().forEach(function(e) {
                var n = e[0];
                if(e.length == 1 && n.replace(/\s/g, "").length){ t(e);logger.clear();
                }
            })
        })
}
if (json.language == "basic" || json.language == "Basic" || json.language == "BASIC"){
int(json.code, function(a){
  console.log(a.toString());
})
} else if(json.language == "javascript"|| json.language == "JavaScript"){
  const { VM } = require('vm2');
  console.log(new VM().run(json.code));
} else if (json.language=="cpp" || json.language=="C++"||json.language=="c++"){
  var JSCPP = require("JSCPP");
  if (json.input){
 JSCPP.run(json.code, json.input);
  } else {
    JSCPP.run(json.code);
  }
} else if (json.language == "python" || json.language == "Python"){
  var { jsPython } = require('jspython-interpreter')
  jsPython()
  .evaluate(json.code);
} else if (json.language == "bash" || json.language == "Bash"){
require('child_process').exec(json.code, function(err, out){
  if (err) console.log(err);
  console.log(out.split('\n').slice(0, out.split('\n').length = 1).join(''));
})
} else if (json.language == "asciiscript" || json.language == "Asciiscript" || json.language == "AsciiScript"){
var { AsciiScript } = require('asciiscript');
AsciiScript.exec(json.code, function(){})
} else {
  console.log(require('chalk').red('TOMTERPRETER ERR! ') + "Language " + json.lang + " not a defined language yet! Make a pull request at the tomterpreter repo to add this language. Did you check if you mispelled?")
}}
else {
   console.log(require('chalk').red('TOMTERPRETER ERR! ') + "No file defined for Tomterpreter to run!")
}