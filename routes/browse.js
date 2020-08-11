var express = require('express');
var router = express.Router();
const fs = require('fs');

// GET content of file system: files and directories

router.get('/', function(req, res) {

    fs.readdir('./db', { withFileTypes: true }, (err, files) => {
        if (err) {
            console.error(err)
            return
        }

        // check whether type is file or directory and add the type to new array
        files = files.map(file => ({
            type: file.isDirectory() ? 'directory' : 'file',
            ...file
        }))

        res.send(files);
    })
});

// browse files of a selected directory: params = req.params.dir
// '/*' takes everything that's after / and puts it in an array
router.get('/*', function(req, res) {
    // reads directory using the absolute path of the 'db' directory adding to it the path in the params
    fs.readdir(__dirname.slice(0, __dirname.length - 7) + '/db/' + req.params[0], { withFileTypes: true }, (err, files) => {
        if (err) {
            console.error(err)
            return
        }

        files = files.map(file => ({
            type: file.isDirectory() ? 'directory' : 'file',
            ...file
        }))

        res.send(files);
    })
});

module.exports = router;