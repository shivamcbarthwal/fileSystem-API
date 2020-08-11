var express = require('express');
var router = express.Router();
var path = require('path');

router.post('/*', function(req, res) {
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
    }

    // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
    let {file} = req.files;
    var uploadPath = __dirname.slice(0, __dirname.length - 7) + '/db/' + req.params[0];
    console.log(req.files);

    // Use the mv() method to place the file somewhere on your server
    file.mv( path.join(uploadPath, file.name), function(err) {
        if (err) {

            return res.status(500).send(err);
        }

        res.send('File uploaded!');
    });

});

module.exports = router;