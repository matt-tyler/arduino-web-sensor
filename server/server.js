var http = require("http");
var url = require("url");

/*
var serialport = require("serialport");
var SerialPort = serialport.SerialPort; // localize object constructor

  var serialPort = new SerialPort("COM3", {
    baudrate: 9600,
	parser: serialport.parsers.readline("\n") 
  });

serialPort.on("open", function () {
  console.log('open');
  serialPort.on('data', function(data) {
    console.log('data received: ' + data);
  });   
});
*/

function start(route,handle) {
  function onRequest(request, response) {
	var pathname = url.parse(request.url).pathname;
    console.log("Request for " + pathname + " received.");
	
	route(handle,pathname,response);
  }

  httpserver = http.createServer(onRequest).listen(8888);
  console.log("Server has started.");
  return httpserver;
}

exports.start = start;