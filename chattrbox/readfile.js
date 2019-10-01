// GOLD CHALLENGE: Moving Error Handling and File Reading to Its Own Module
const fs = require('fs');
const mime = require('mime');
const extract = require('./extract');

module.exports = folder => {
    const readFile = function(req, res) {
        let filePath = extract(req.url, folder);
        fs.readFile(filePath, function(err, data) {
            if (err) {
                handleError(err, res);
                return;
            } else {
                console.log("MIME Type: " + mime.getType(filePath));
                // Silver Challenge: Providing a MIME Type Dynamically
                res.setHeader('Content-Type', mime.getType(filePath));
                res.end(data);
            }
        });
    }

    const handleError = function(err, res) {
        // Bronze Challenge: Creating a Custom Error Page
        let filePath = extract('/error.html', folder);
        fs.readFile(filePath, function(err, data) {
            // Silver Challenge: Providing a MIME Type Dynamically
            res.setHeader('Content-Type', mime.getType(filePath));
            res.end(data);
        });
    };

    return readFile;
};
