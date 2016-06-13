/**
 * Router
 */

var url = require('url');

exports.route = function (request, response, handler) {
    
    var pathname = url.parse(request.url).pathname;
    
    if (typeof handler[pathname] == 'function') {
        console.log('Routing to :' + pathname);
        handler[pathname](request, response);
    } else {
        handler['/default'](request, response);
    }
}