import { spawn } from 'child_process';
import express from 'express';
const app = express();
import path from 'path';

const hostname = 'popsaserver';
const port = 8000;
const ollama_python_path = '/home/popsa/.local/share/pipx/venvs/ollama/bin/python';

const chatbot_py_path = import.meta.dirname + '/chatbot.py';
var user_message = "";
var response = "";

app.use(express.static(path.join(import.meta.dirname, 'public')));
app.use(express.urlencoded({extended:true}));
app.use(express.text());

const server = app.listen(port, "0.0.0.0", () => {
    console.log(`Server running on http://${hostname}:${port}`);
});

app.post('/request', (req, res) => {
    user_message = req.body;

    const python_process = spawn(ollama_python_path, [chatbot_py_path, user_message])
    python_process.stdout.on('data', (data) => {
        response = data.toString();
        res.send(response);
    });
});
