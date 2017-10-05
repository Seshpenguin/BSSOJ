/*
 * BSS OJ - Accounts Server.
 */
var socket = require('socket.io-client')('http://localhost:3000');
var MariaDB = require('mariasql');
var config = require('./config');

socket.on('connect', function () {
    console.log('[INFO] Connected to Web/Comm Server!')
    socket.emit('register-accountserver', config.serverAuthPassword);
});
socket.on('event', function (data) {
    console.log(data);
});
socket.on('disconnect', function () {
    console.log('[ERROR] Forcibly disconnected from Web/Comm Server.');
});

var SQL = new MariaDB({
    host: '127.0.0.1',
    user: 'root',
    password: 'password123'
});

var createTable = "CREATE TABLE Users (\
    id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY, \
    username VARCHAR(30) NOT NULL,\
    firstname VARCHAR(30) NOT NULL,\
    lastname VARCHAR(30) NOT NULL,\
    email VARCHAR(50),\
    reg_date TIMESTAMP\
    )";

// get the database ready
SQL.on('ready', function () {
    console.log('[OK] DB is ready.');
    if (SQL.isMariaDB()) {
        console.log('[OK] Using MariaDB ' + SQL.serverVersion());
    } else {
        console.log('[ERROR] MySQL is not supported. Use MariaDB.');
        process.exit();
    }
    
    SQL.query('SHOW DATABASES', function (err, rows) {
        if (err)
            throw err;
        console.dir(rows);
    });
    SQL.query('USE BSSOJ', function (err, rows) {
        if (err)
            throw err;
        console.log('[OK] Selecting BSSOJ Database...')
        console.dir(rows);
    });
});

// event listeners
socket.on('registerUser', function (data) {
    console.log('Registering user!!!');
});


// functions

function registerUser(firstname, lastname, username, password, email) {

}

function authUser() {

}

function editUser() {

}

SQL.end();