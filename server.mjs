import { spawn } from 'child_process';
import express from 'express';
const app = express();
import path from 'path';

const hostname = 'localhost';
const port = 8000;

const python_path = import.meta.dirname + '\\chatbot.py'
var conversation_history = "";
var delimiter = "This is the next message in the coversation. Only respond to this message."
var user_message = "";
var response = "";

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
    conversation_history =  conversation_history + "<|start|>user<|message|>" + user_message + '<|end|>\n';
    conversation_history = conversation_history + "<|start|>assistant<|message|>" + response + '<|end|>\n';
});

