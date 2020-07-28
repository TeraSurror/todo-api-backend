// Require packages
const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

// Initialize express app
const app = express();

// Create connection to local database
const db = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'harshshelar',
    database : 'todolist'
});

// Connect to the database
db.connect((err) => {
    if(err){
        console.error('Could not connect to database');
        return;
    }
    console.log('Connected to Database successfully');
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : false }));

app.get('/', (req, res) => {
    res.json({
        "message" : "Hello World"
    });
});

// Custom routes for login and registration
app.use('/app/agent', require('./routes/auth'));

// Custom routes for adding and listing tasks
app.use('/app/sites', require('./routes/task'));

app.listen(3000, () => console.log('Listening on 3000'));