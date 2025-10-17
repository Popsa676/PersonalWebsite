import { spawn } from 'child_process';
import express from 'express';
const app = express();
import path from 'path';
import fs from 'fs';

const hostname = 'localhost';
const port = 3000;

const text_path = import.meta.dirname + '\\system_message.txt';
const python_path = import.meta.dirname + '\\chatbot.py'
var conversation_history = "";
var delimiter = "This is the next message in the coversation. Only respond to this message."
var user_message = "";
var response = "";

fs.readFile(text_path, 'utf8', (err, data) => {
    conversation_history += data;
});

app.use(express.static(path.join(import.meta.dirname, 'public')));
app.use(express.urlencoded({extended:true}));
app.use(express.text())

app.listen(port, () => {
    console.log(`Server running on http://${hostname}:${port}`);
});

app.post("/request", (req, res) => {
    user_message = req.body;

    const python_process = spawn('python', [python_path, conversation_history + delimiter + user_message])
    python_process.stdout.on('data', (data) => {
        response = data.toString();
        res.send(response);
    });
    conversation_history = conversation_history + "<start-of-turn>user\n" + user_message + '<end-of-turn>\n';
    conversation_history = conversation_history + "<start-of-turn>model\n" + response + '<end-of-turn>\n';
});

