var exec = require("child_process").exec;
var querystring = require("querystring");
var fs = require("fs");
var formidable = require("formidable");
var path = './assets/img.jpg';
/**
 * Request Handler
 */
exports.index = function (request, response) {
    fs.readFile('form.html', function (err, data) {
        if (err) {
            return console.error(err);
        }

        response.writeHeader(200, {'Content-Type': 'text/html'});
        response.write(data);
        response.end();
    });
};

exports.upload = function (request, response) {

    var form = new formidable.IncomingForm();

    form.parse(request, function (error, fields, files) {

        if (error) {
            return console.error(error);
        }
        
        
       // console.log("files")
        console.log(files);
        console.log('./assets/'+files.profilepic.name);
        /* Possible error on Windows systems:
         tried to rename to an already existing file */
        fs.rename(files.profilepic.path, './assets/'+files.profilepic.name, function (err) {
            if (err) {
                console.log(err);
                fs.unlink('./assets/'+files.name);
                fs.rename(files.profilepic.path, './assets/'+files.profilepic.name);
            } else {
                path = './assets/'+files.profilepic.name;
            }
        });
        
        
        response.writeHead(200, {"Content-Type": "text/html"});
        //response.write("Name :"+fields.name);
        //response.write("<br/>Des :"+fields.description);
        response.write("received image:<br/>");
        response.write("<img src='/show' />");
        response.end();
    });




    /**
     response.writeHead(200,{"Content-Type" : "text/html"});
     // response.write(querystring.parse(postData).name);
     response.write("<br/>");
     //response.write(querystring.parse(postData).description);
     response.end();*/
};

exports.show = function (request, response) {
    fs.readFile(path, function (error, data) {

        if (error) {
            return console.error(error);
        }

        response.writeHead(200, "Content-Type", "image/jpg");
        response.write(data, "binary");
        response.end();
    });
};


exports.default = function (request, response) {
    response.writeHeader(200, {'Content-Type': 'text/html'});
    response.write("handler not found");
    response.end();
};