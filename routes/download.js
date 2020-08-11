var express = require('express');
var router = express.Router();
const fs = require('fs');
var path = require('path');
var mime = require('mime-types')


router.get('/*', function(req, res) {
    console.log(req.params)

    /*fs.readFile( __dirname.slice(0, __dirname.length - 7) + '/db/' + req.params[0], function (err, data) {
        if (err) {
            console.log(err);
            throw err;
        }
        console.log(data.toString());
        res.send(data);
    })*/
    var filePath = __dirname.slice(0, __dirname.length - 7) + '/db/' + req.params[0];
    var stat = fs.statSync(filePath);
    var mimetype = mime.lookup(filePath);
    res.writeHead(200, {
        'Content-Type': mimetype,
        'Content-Length': stat.size
    });

    var readStream = fs.createReadStream(filePath);
    // We replaced all the event handlers with a simple call to readStream.pipe()
    readStream.pipe(res);
});

module.exports = router;