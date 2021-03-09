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

// about page
app.get('/todo', function(req, res) {
    var ans;
    connection.connect()
    connection.query('SELECT * FROM todo', function (err, rows, fields) {
        if (err) throw err
        connection.end()
        res.render('pages/todo', {rows: rows});
    })
    
    
});


app.listen(port, function() {
    console.log('Server listening on port ' + port + '...');
});