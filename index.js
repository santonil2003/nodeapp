/**
* Import necessary module
*/
var server = require('./server');
var router = require('./router');
var requestHandlers = require('./requestHandler');


/**
* Map request handler based on pathinfo
*/
var handler = {};
handler['/'] = requestHandlers.index;
handler['/index'] = requestHandlers.index;
handler['/upload'] = requestHandlers.upload;
handler['/show'] = requestHandlers.show;
handler['/default'] = requestHandlers.default;


/**
* Start server
*/
server.start(router.route, handler);