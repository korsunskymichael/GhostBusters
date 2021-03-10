var express = require('express');
var app = express();
var port = process.env.PORT || 3000;
var mysql = require('mysql');


app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));


var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'ghostbusters'
})


// index page
app.get('/', function(req, res) {
    res.render('pages/index');
});

// todo page
app.get('/todo', function(req, res) {
    res.render('pages/todo');
});


app.listen(port, function() {
    console.log('Server listening on port ' + port + '...');
});