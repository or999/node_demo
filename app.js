import { createServer, get } from 'http';
import EventEmitter from 'events';
import { MongoClient } from 'mongodb';
const hostname = '127.0.0.1';
const port = 3000;
const server = createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.write('hello ');
    res.end('world !');
});
server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
get('http://127.0.0.1:3000/', (res) => {
    console.log(res);
}).on('socket', (socket) => {
    socket.emit('agentRemove');
});
const eventEmitter = new EventEmitter();
eventEmitter.on('start', (event) => {
    console.log(event);
});
eventEmitter.emit('start', 1, 2, 3, 4);
// const fs = require('fs');
// fs.readFile('', function (err, data) {
//     if (err) return console.error(err);
//     console.log(data.toString());
// });
MongoClient.connect('mongodb://localhost:27017/runoob').then(res => {
    const dbo = res.db('runoob');
    dbo.collection('sit').insertMany([{
        name: 'Tom', age: 18, gender: 'F'
    }])
        .catch(error => {
            console.log(error);
        })
        .then(res => {
            console.log(res.insertedCount);
        });
    console.log(res);
});
