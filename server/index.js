var server = require("./server");
var router = require("./router");
var requestHandlers = require("./requestHandlers");


var handle = {}
handle["/"] = requestHandlers.start;
handle["/start"] = requestHandlers.start;
handle["/upload"] = requestHandlers.upload;

httpserver = server.start(router.route,handle);

var io = require("socket.io").listen(httpserver);

var serialport = require("serialport");
var SerialPort = serialport.SerialPort; // localize object constructor
var portname = "/dev/ttyS0";

var serialPort = new SerialPort(portname, {
	baudrate: 9600,
	parser: serialport.parsers.readline("\n") 
});

io.sockets.on('connection', function (socket) {
	// If socket.io receives message from the client browser then 
    // this call back will be executed.
    socket.on('message', function (msg) {
        console.log(msg);
    });
    // If a web browser disconnects from Socket.IO then this callback is called.
    socket.on('disconnect', function () {
        console.log('disconnected');
    });
});

serialPort.on("open", function () {
  console.log('open');
  serialPort.on('data', function(data) {
    //console.log('data received: ' + data);
	io.sockets.emit('update',data);
  });   
});
