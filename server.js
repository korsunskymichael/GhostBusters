var express = require('express');
var app = express();
var port = process.env.PORT || 3000;
var mysql = require('mysql');
var path = require('path');
var bodyParser = require('body-parser');

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())

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

// main table in todo page
app.get('/todo', function(req, res) {
    const queryString = 'select todo_id, assignee, description, finish_date, if(complete=0, "False", "True") as complete from todo;'

    connection.query(queryString, function (err, rows, fields) {
        if (err) throw err
        
        res.render('pages/todo', {rows: rows});
    })
        
});

// add values to todo list
app.post('/add_to_table', function(req, res) {
    const assignee = req.body.assignee;
    const description = req.body.description;
    const finish_date = req.body.finish_date;


    const queryString = "INSERT INTO todo (assignee, description, finish_date) VALUES ('" + String(assignee) + "', '" + String(description) + "', '" + String(finish_date) + "');"
    console.log(queryString)

    connection.query(queryString, (err, rows, fields) => {
        res.redirect('/todo')
    })
  })

// delete a row from todo list
app.post('/delete_by_id', function(req, res) {
    const id = req.body.ID;
    
    const queryString = "DELETE FROM todo WHERE todo_id=" + id + ";"
    console.log(queryString)

    connection.query(queryString, (err, rows, fields) => {
        res.redirect('/todo')
    })
  })

// update a row in todo list
app.post('/update_by_id', function(req, res) {
    const id = req.body.ID;
    const assignee = req.body.assignee;
    const description = req.body.description;
    const finish_date = req.body.finish_date;

    const queryString = "UPDATE todo SET assignee='" + String(assignee) + "', description='" + String(description) + "', finish_date='" + String(finish_date) + "' WHERE todo_id=" + id + ";"
    console.log(queryString)

    connection.query(queryString, (err, rows, fields) => {
        res.redirect('/todo')
    })
  })

//complete
app.post('/complete_by_id', function(req, res) {
    const id = req.body.ID;

    const queryString = "UPDATE todo SET complete='" + String(1) + "' WHERE todo_id=" + id + ";"
    console.log(queryString)

    connection.query(queryString, (err, rows, fields) => {
        res.redirect('/todo')
    })
  })  

app.listen(port, function() {
    console.log('Server listening on port ' + port + '...');
});

