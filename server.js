var express = require('express');
var app = express();
var port = process.env.PORT || 3000;
var mysql = require('mysql');
var path = require('path');
var bodyParser = require('body-parser');
var functions = require("./public/functions.js");

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())


/*
    mysql connection settings.
    On initiation, the settings must be updated to  the local connection settings
*/
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
    //query for all rows from todo table required for main_table
    const queryString = 'SELECT todo_id, assignee, description, finish_date, if(complete=0, "False", "True") as complete FROM todo;'
    
    connection.query(queryString, function (err, rows, fields) {
        if (err) throw err
        console.log("Query: " + queryString);
        res.render('pages/todo', {rows: rows});
    })        
});


// add a row to todo list
app.post('/add_to_table', function(req, res) {
    //all the needed values (description may be empty, assignee is from selection) to be added to 
    const assignee = req.body.assignee;
    const description = req.body.description;
    const finish_date = req.body.finish_date;
    //validating that the inserted value for finish date is valid (if not, a relevant error is printed in console)
    var dateValidity = functions.validDate(finish_date);

    if (dateValidity == true){
        const queryString = "INSERT INTO todo (assignee, description, finish_date) VALUES ('" + String(assignee) + "', '" + String(description) + "', '" + String(finish_date) + "');"
        console.log("Query: " + queryString);

        connection.query(queryString, (err, rows, fields) => {
            res.redirect('/todo')
        })
    }
});


// delete a row from todo list
app.post('/delete_by_id', function(req, res) {
    const id = req.body.ID;
    // query to find all id's placed in todo list
    const idValidityQueryString = "SELECT todo_id FROM todo;"
    // query to delete a row by given id
    const queryString = "DELETE FROM todo WHERE todo_id=" + id + ";"
    
    connection.query(idValidityQueryString, (err, rows, fields) => {
        /* 
            checking if the given id is existing in the current id's placed in the todo table (if it does, boolean "true" value returned or vice versa) 
            if flase returned: the 'queryString' is not executed
        */
        var valid = functions.validID(id, rows);
        if (valid == true){
            connection.query(queryString, (err, rows, fields) => {
                console.log("Query: " + queryString);
                res.redirect('/todo');
            })
        }
        else {
            console.log("ERROR: ID not found in todo table")
        }
    })    
});


// update a row in todo list
app.post('/update_by_id', function(req, res) {
    const id = req.body.ID;
    // possible values from row with the given id to be updated  
    const assignee = req.body.assignee;
    const description = req.body.description;
    const finish_date = req.body.finish_date;
    
    // building the Object array to be sent to 'validUpdate' function
    var validityObjectArray = {"todo_id": String(id), "assignee": String(assignee), "description": String(description), "finish_date": String(finish_date)}
    // query to find all id's placed in todo list
    var idValidityQueryString = "SELECT todo_id FROM todo;"
    
    connection.query(idValidityQueryString, (err, rows, fields) => {
        var valid = functions.validID(id, rows);
        /* 
            checking if the given id is existing in the current id's placed in the todo table (if it does, boolean "true" value returned or vice versa) 
            if flase returned: the 'queryString' is not executed
        */
        if (valid == true){
            // checking the values of assignee, description, finish_date (if an empty String value returned, 'validQueryString' query is not executed )
            var validQueryString = functions.validUpdate(validityObjectArray);
            if (validQueryString != ""){
                connection.query(validQueryString, (err, rows, fields) => {
                    console.log("Query: " + validQueryString)
                    res.redirect('/todo')
                })
            }
        }
        else {
            console.log("ERROR: ID not found in todo table")
        }
    })     
});


//complete
app.post('/complete_by_id', function(req, res) {
    const id = req.body.ID;
    // query to find all id's placed in todo list
    const idValidityQueryString = "SELECT todo_id FROM todo;"
    // query to update a mission status (of a row) to complete
    const queryString = "update todo SET complete='" + String(1) + "' WHERE todo_id=" + id + ";"
    
    connection.query(idValidityQueryString, (err, rows, fields) => {
        /* 
            checking if the given id is existing in the current id's placed in the todo table (if it does, boolean "true" value returned or vice versa)
            if flase returned: the 'queryString' is not executed
        */
        var valid = functions.validID(id, rows);
        if (valid == true){
            connection.query(queryString, (err, rows, fields) => {
                console.log(queryString);
                res.redirect('/todo');
            })
        }
        else {
            console.log("ERROR: ID not found in todo table")
        }
    })
});  


app.listen(port, function() {
    console.log('Server listening on port ' + port + '...');
});

