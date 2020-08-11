var express = require('express');
var router = express.Router();
const fs = require('fs');

router.delete('/*', function(req, res) {

    // reads file path using the absolute path of the 'db' directory adding to it the path in the params
    var filePath = __dirname.slice(0, __dirname.length - 7) + '/db/' + req.params[0];
    fs.unlink(filePath, (err) => {
        if (err) {
            console.error(err)
            return
        }
        res.json({message: 'File deleted'});
        //file removed
    })

});

module.exports = router;