// creating a jsreport instance
var jsreport = require('jsreport')()

if (process.env.JSREPORT_CLI) {
 // when the file is required by jsreport-cli, export
 // jsreport instance to make it possible the usage of jsreport-cli
 module.exports = jsreport
} else {
 // when the file is started with node.js, start the jsreport server normally
 jsreport.init().then(function () {
   console.log('server started..')
 }).catch(function (e) {
   // error during startup
   console.error(e.stack)
   process.exit(1)
 })
}