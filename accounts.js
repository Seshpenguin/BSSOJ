/*
 * BSS OJ - Accounts Server.
 */
var socket = require('socket.io-client')('http://localhost:3000');
var MariaSQL = require('mariasql');
var config = require('./config');

socket.on('connect', function () {
    console.log('Connected to Socket.IO Server!')
    socket.emit('register-accountserver', config.serverAuthPassword);
});
socket.on('event', function (data) {
    console.log(data);
});
socket.on('disconnect', function () {

});

var SQL = new MariaSQL({
    host: '127.0.0.1',
    user: 'root',
    password: 'password123'
});
SQL.query('SHOW DATABASES', function (err, rows) {
    if (err)
        throw err;
    console.dir(rows);
});

// event listeners
socket.on('registerUser', function (data){
    console.log('Registering user!!!');
});


// functions

function registerUser(username, password) {

}

function authUser() {

}

function editUser() {

}

SQL.end();