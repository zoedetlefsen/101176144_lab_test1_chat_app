const express = require('express');
const mongoose = require('mongoose')
const app = express();


//database connection
mongoose.connect('mongodb+srv://root:4chJbbfBfyJNUOv5@cluster0.bs6u4dl.mongodb.net/?retryWrites=true&w=majority') 
.then(() => console.log('Database Connected'))
.catch((err) => console.log('Database not Connected', err));


app.use(express.json());


const server = require('http').createServer(app);
const io = require('socket.io')(server);

app.use('/', require('./routes/authRoutes'))

io.on('connection', (socket) => {
    console.log('A user connected');
    
    socket.on('joinRoom', ({ username, room }) => {
      socket.join(room);
      socket.to(room).emit('message', `${username} has joined the room`);
      console.log(`${username} joined room: ${room}`);
    });
  
    socket.on('chatMessage', ({ room, message }) => {
      io.to(room).emit('message', message);
    });
  
    socket.on('typing', (data) => {
      socket.to(data.room).emit('typing', data);
    });
  
    socket.on('disconnect', () => {
      console.log('User disconnected');
    });
  });
  
  const PORT = 4000;
  server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  