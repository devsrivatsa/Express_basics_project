/*
This file returns the directory path to the main file - App.js.

path.dirname:  returns the directory path
require.main.filename: returns the path for the mainfile - App.js.

This is a cleaner way to get the path than that of using path.join(__dirname,"","folder","file")
*/

const path = require('path');

module.exports = path.dirname(require.main.filename);