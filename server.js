/*
 *  BSS OJ
 *  
 *  An Online Code Judge, written in NodeJS.
 *  Licensed under the GNU Public License.
 * 
 * BSS Web/Communication Server (WCS)
 */

const { exec }  = require('child_process');
const express = require('express')
const app = express()
var http = require('http').Server(app);
var io = require('socket.io')(http);
fs = require('fs');


var testCase  = '';

// keep track of IDs
var accountServerID;
var hasAccountServerRegistered = false;

console.log("[INFO] Started BSSOJ Web/Communication Server")



//Web Server
app.use(express.static('public'));

http.listen(3000, function(){
  console.log('listening on *:3000');
});

//Socket.IO Server
io.on('connection', function(socket){
  console.log('a user connected');
  io.to('accounts').emit('some event');
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });

  socket.on('register-accountserver', function(msg){
    console.log('Got accountserver register message: ' + msg);
    console.log(socket.id);
    if(hasAccountServerRegistered == false){
      console.log('[OK] Registering accounts server.');
      accountServerID = socket.id;
    }else{
      console.log('[WARNING] A client attempted to register as an account server.');
    }
  });
  
});
