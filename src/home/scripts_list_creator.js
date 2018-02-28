//we need to create a script to read the file list because the loader file is run into the browser and
//it is impossible to read the content of a folder
const fs = require('fs');
const path = require('path');
const regexSort = require("regex-sort");
const folder = path.resolve(__dirname, 'dist');

let result;

//get the list of files and order it
if (fs.existsSync(folder)) {
    var files = fs.readdirSync(folder).filter(function(file) {
        //return only the .js and .css files
        return /^(?!(loader)).*\.(js|css)$/.test(file.toLowerCase());
    });
    
    //sort the array,the angular-cli bundles needs to be loaded following a specific order
    result = regexSort(files, [
        /^inline.*\.js$/,
        /^(?!(inline|main|loader)).*\.(js|css)$/
      , /^main.*\.js$/
    ]);
}

fs.writeFileSync("./lib/bundle_list.json", JSON.stringify(result), 'utf8', function (err) {
    if (err) {
        return console.log(err);
    }
});