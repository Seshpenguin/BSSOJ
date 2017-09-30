/*
 * BSS OJ - Judge Server.
 */
var socket = require('socket.io-client')('http://localhost:3000');
fs = require('fs');
const { exec } = require('child_process');

socket.on('connect', function () {
    console.log('Connected to Socket.IO Server!')
});
socket.on('event', function (data) {

});
socket.on('disconnect', function () {

});


function loadTestCases(id) {
    fs.readFile('testOut.txt', 'utf8', function (err, data) {
        if (err) {
            return console.log(err);
        }
        console.log(data);
        testCase = data;
    });
}


console.log(testCase);

function judgeJava(id) {
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
            if (stdout.trim() === testCase.trim()) {
                console.log('YOU DID IT');
            }
            out = stdout;

        });
    });
}