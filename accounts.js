/*
 * BSS OJ - Accounts Server.
 */
var socket = require('socket.io-client')('http://localhost:3000');

socket.on('connect', function(){
    console.log('Connected to Socket.IO Server!')
    socket.emit('register-accountserver', 'SomePassword');
});
socket.on('event', function(data){
    console.log(data);
});
socket.on('disconnect', function(){
    
});

function registerUser(){

}

function authUser(){
    
}

function editUser(){
    
}