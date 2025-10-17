const express = require('express');
const app = express();
const { createServer } = require('node:http');
const http = require('http');
const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

const hostname = 'localhost';
const port = 3000;
const python_path = __dirname + '/chatbot.py'

/*const server = createServer((req, res) => {
    let file_path = __dirname;

    if (req.url === '/') {
        file_path += '/public/main.html';
    }

    else {
        file_path = file_path + '/' + req.url;
    }

    const extname = String(path.extname(file_path)).toLowerCase();
    const content_type = {
        '.html': 'text/html',
        '.js': 'text/javascript',
        '.css': 'text/css',
        '.json': 'application/json',
        '.png': 'image/png',
        '.jpg': 'image/jpg',
        '.gif': 'image/gif',
        '.svg': 'image/svg+xml',
    }[extname] || 'application/octet-stream';

    fs.readFile(file_path, (error, content) => {
        if (error) {

        if (error.code == 'ENOENT') {
            fs.readFile('./public/404.html', (error, content) => {
            res.writeHead(404, { 'Content-Type': 'text/html' });
            res.end(content, 'utf-8');
            });
        } 
        
        else {
            res.writeHead(500);
            res.end('Server Error: ' + error.code);
        }
        } 
        
        else {
        res.writeHead(200, { 'Content-Type': content_type });
        res.end(content, 'utf-8');
        }
    });
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
*/

app.use(express.static(path.join(__dirname, 'public')));

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});

const python_process = spawn('python', [python_path])

python_process.stdout.on('data', (data) => {
    process.stdout.write(`${data}`);
});