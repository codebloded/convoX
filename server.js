const { static } = require('express');
const express = require('express');
const app = express()
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const PORT = process.env.PORT ||"3000";
const host = 'localhost';

app.use(express.static(__dirname +'/public'));
app.get('/', (req, res)=>{
    res.sendFile(__dirname + '/index.html');
});

http.listen(PORT, ()=>{ 
    console.log(`Server is up and running at http://${host}:${PORT}`);
});

//socket connection
io.on('connection',(socket)=>{
    console.log("Connected...");
    socket.on('message', (msg)=>{
        socket.broadcast.emit('message', msg);
    })
});