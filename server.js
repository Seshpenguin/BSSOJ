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

// load config file
var config = require('./config');

var testCase  = '';

// keep track of IDs
var accountServerID;
var hasAccountServerRegistered = false;



console.log("[INFO] Started BSSOJ Web/Communication Server");



//Web Server
app.use(express.static('public'));
app.use('/assets', express.static('public/assets'))

http.listen(3000, function(){
  console.log('listening on *:3000');
});

//Socket.IO Server
io.on('connection', function(socket){
  console.log(socket);
  console.log('a user connected');
  io.to('accounts').emit('some event');
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });

  socket.on('register-accountserver', function(msg){
    console.log('[OK] Got accountserver register message: ' + msg);
    console.log('[DEBUG] accountserver ID:' + socket.id);
    if(hasAccountServerRegistered == false){
      console.log('[OK] Registering accounts server...');
      console.log('[OK] Verifing password...');
      if(msg == config.serverAuthPassword){
        accountServerID = socket.id;
        console.log('[INFO] Registered the accounts server.');
        //io.to(accountServerID).emit('registerUser', 'for your eyes only');
      }else{
        console.log('[WARNING] Accounts server failed to register: Wrong Password');
      }
        
    }else{
      console.log('[WARNING] A client attempted to register as an account server. (Server already registered)');
    }
  });

  socket.emit
});
