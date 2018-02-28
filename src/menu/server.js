var express = require('express');
var path = require('path');

const app = express();

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(express.static(path.join(__dirname,'dist')));

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname,'index.html'));
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});



app.listen(process.env.PORT || 4200, function () {
    console.log('Server listening on port' + (process.env.PORT || 4200));
});

module.exports = app;