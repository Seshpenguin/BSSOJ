/*
 *  BSS OJ
 *  
 *  An Online Code Judge, written in NodeJS.
 *  Licensed under the GNU Public License.
 */

const { exec }  = require('child_process');
const express = require('express')
const app = express()
var http = require('http').Server(app);
var io = require('socket.io')(http);

fs = require('fs')




var testCase  = '';

fs.readFile('testOut.txt', 'utf8', function (err,data) {
  if (err) {
    return console.log(err);
  }
  console.log(data);
  testCase = data;
});

console.log(testCase);

var out = '';
exec('javac test.java', (err, stdout, stderr) => {
    if (err) {
        // node couldn't execute the command
        console.log('Error Compiling: ' + err);
        return;
    }

    // the *entire* stdout and stderr (buffered)
    console.log('Done Compiling, running...');
    
    exec('java test', (err, stdout, stderr) => {
        console.log(`stdout: ${stdout}`);
        console.log(`stderr: ${stderr}`);
        if(stdout.trim() === testCase.trim()){
            console.log('YOU DID IT');
        }
        out = stdout;
        
    });
});

//Web Server
app.use(express.static('public'));

io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});
http.listen(3000, function(){
  console.log('listening on *:3000');
});