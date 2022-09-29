// const http = require('http');

const fs = require('fs');
const path = require('path');
const express = require('express');

// function handleRequest(request, response) {
//     if(request.url === '/currenttime'){
//         response.statusCode = 200;
//         response.end('<h1>' + new Date().toISOString() + '</h1>');
//     }else if(request.url === '/') {
//         response.statusCode = 200;
//         response.end('<h1>Hello! I am a node js server!!!');
//     }

// }
// const server = http.createServer(handleRequest);

// server.listen(3000);

const app = express();

app.use(express.urlencoded({extended: false}));

app.get('/currenttime', function (req, res) {
    res.send('<h1>I am currenttime route</h1>');
});

app.get('/', function (req, res) {
    res.send('<form action="/store-user" method="POST"><label>Your Username</label><input type="text" name="username"><button>Submit</button></form>');
});

app.post('/store-user', function(req, res) {
    const userName = req.body.username;
    // console.log(userName);
    const filePath = path.join(__dirname, 'data', 'users.json');
    const fileData = fs.readFileSync(filePath);//treated as text
    const existingUsers = JSON.parse(fileData);

    existingUsers.push(userName);
    fs.writeFileSync(filePath, JSON.stringify(existingUsers));


    res.send('<h1> Hi ' + userName + '</h1>');
});

app.get('/users', function(req, res) {
    const filePath = path.join(__dirname, 'data', 'users.json');
    const fileData = fs.readFileSync(filePath);//treated as text
    const existingUsers = JSON.parse(fileData);

    let responseData = '<ul>';

    for(const user of existingUsers) {
        responseData += '<li>' + user + '</li>';
    }

    responseData += '</ul>';

    res.send(existingUsers);
});

app.listen(3000);