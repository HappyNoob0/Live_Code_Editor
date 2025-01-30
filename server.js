const express= require('express')
const app = express();
const http= require('http');
const server = http.createServer(app);
const { Server } = require( 'socket.io');
const ACTIONS = require('./src/Actions');
const io = new Server(server);

 const userSocketMap = {};
 function getAllConnectedClients(roomId){
  Array.from(io.sockets.adapter.rooms.get(roomId) || []);
 }

io.on('connection', (socket) =>{
  console.log('socket connected', socket.id);

  socket.on(ACTIONS.JOIN ,({roomId , username}) =>{
    userSocketMap[socket.id] = username;
    socket.join(roomId);
    const clients = getAllConnectedClients(roomId);
  });
  
});

const PORT = process.env.PORT || 5000;
server.listen(PORT,() => console.log(`Listening on port ${PORT}`));