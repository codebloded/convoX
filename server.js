const { static } = require('express');
const express = require('express');
const app = express()
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const port ="3000";
const host = 'localhost';

app.use(express.static(__dirname +'/public'));
app.get('/', (req, res)=>{
    res.sendFile(__dirname + '/index.html');
});

http.listen(port, ()=>{ 
    console.log(`Server is up and running at http://${host}:${port}`);
});