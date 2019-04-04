const ioServer = require('socket.io');
const RTCMultiConnectionServer = require('rtcmulticonnection-server');

var bp = require('body-parser')

var cors = require('cors')

var config = require('./config.json')

const port = process.env.PORT || config.port;

var auth = require('./auth.js')

const express = require('express');
const app = express();

app.use(bp.json())
app.use(cors())
const path = require('path');
const server = require('http');

var rooms = {}

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.post('/auth', function(req, resp) {
    var patient_id = auth.authenticate(req.body.user)

    if (patient_id == 0) {
        resp.send(JSON.stringify({"success" : false, "message" : "User auth failed"}))
    } else {
        console.log(patient_id)
        console.log(rooms)
        var room_id = auth.get_room_id(patient_id, rooms)
        return resp.send(JSON.stringify({"success" : true, "message" : room_id}))
    }
})

app.post('/register_room', function(req, resp) {
    var room_id = req.body.room_id
    rooms[req.body.patient_id] = room_id 
    resp.send(JSON.stringify({success : true, message : "Room ID created"}))
})

var httpServer = server.createServer(app);

httpServer.listen(port, process.env.IP || config.host , function() {
    console.log('Server is running on port ' + port);
});


ioServer(httpServer).on('connection', function(socket) {

    console.log(socket)
    RTCMultiConnectionServer.addSocket(socket);

    const params = socket.handshake.query;

    if (!params.socketCustomEvent) {
        params.socketCustomEvent = 'custom-message';
    }

    socket.on(params.socketCustomEvent, function(message) {
        socket.broadcast.emit(params.socketCustomEvent, message);
    });
});