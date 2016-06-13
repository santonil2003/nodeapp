/**
 * Import necessary module
 */
var http = require('http');


exports.start = function(route, handler) {
    /**
     * createServer
     */
    http.createServer(function(request, response) {
        route(request, response, handler);

    }).listen(8888);
    /**
     * Start server
     */
    console.log('Server Started at http://localhost:8888');
};