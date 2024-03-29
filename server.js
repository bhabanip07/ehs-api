var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var http = require('http');

var licenseCondition = require('./routes/license-conditions');
var reportType = require('./routes/lc-report-type');
var shuiTest = require('./routes/shui-test.router');
var paymentType = require('./routes/lc-payment-type');
var debug = require('debug')('ehs-api:server');

var app = express();
var port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use('/api/v1/licenseCondition', licenseCondition);
app.use('/api/v1/reportType', reportType);
app.use('/api/v1/shuiTest', shuiTest);
// app.use('/api/v1/paymentType', paymentType);

app.set('port', port);
// Create HTTP server.
var server = http.createServer(app);

//Listen on provided port, on all network interfaces.
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);





//Event listener for HTTP server "error" event.
function onError(error) {
    if (error.syscall !== 'listen') {
      throw error;
    }
  
    var bind = typeof port === 'string'
      ? 'Pipe ' + port
      : 'Port ' + port;
  
    // handle specific listen errors with friendly messages
    switch (error.code) {
      case 'EACCES':
        console.error(bind + ' requires elevated privileges');
        process.exit(1);
        break;
      case 'EADDRINUSE':
        console.error(bind + ' is already in use');
        process.exit(1);
        break;
      default:
        throw error;
    }
  }
  
//Event listener for HTTP server "listening" event.
  function onListening() {
    var addr = server.address();
    var bind = typeof addr === 'string'
      ? 'pipe ' + addr
      : 'port ' + addr.port;
    debug('Listening on ' + bind);
  }


