const http = require('http');
const express = require('express');

const app = express();

const server = http.createServer(app);

// Pass a http.Server instance to the listen method
const io = require('socket.io').listen(server);

// The server should start listening
server.listen(80);

// Register the index route of your app that returns the HTML file
app.get('/', function (req, res) {
    console.log("Homepage");
    res.sendFile(__dirname + '/index.html');
});

// Expose the node_modules folder as static resources (to access socket.io.js in the browser)
app.use('/static', express.static('node_modules'));

// Handle connection
io.on('connection', function (socket) {
    console.log("Connected succesfully to the socket ...");

    const news = [
        { title: 'The cure of the Sadness is to play Videogames',date:'04.10.2016'},
        { title: 'Batman saves Racoon City, the Joker is infected once again',date:'05.10.2016'},
        { title: "Deadpool doesn't want to do a third part of the franchise",date:'05.10.2016'},
        { title: 'Quicksilver demand Warner Bros. due to plagiarism with Speedy Gonzales',date:'04.10.2016'},
    ];

    // Send news on the socket
    socket.emit('news', news);

    socket.on('my other event', function (data) {
        console.log(data);
    });
});
