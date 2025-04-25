const fs = require('fs');
const path = require('path');

let users = {
    "Danplays": {
        password: "daniel2025",
        role: 2,
        conversations: []
    }
};
let currentUser = null;
let commands = {};

function loadCommands() {
    fs.readdirSync(path.join(__dirname, 'commands')).forEach(file => {
        if (file.endsWith('.js')) {
            const command = require(path.join(__dirname, 'commands', file));
            commands[command.name] = command;
        }
    });
}

loadCommands();

function showChatContainer() {
    document.querySelector('.login-container').style.display = 'none';
    document.querySelector('.chat-container').style.display = 'block';
}

document.getElementById('signup-link').addEventListener('click', () => {
    document.getElementById('login-form').style.display = 'none';
    document.getElementById('signup-form').style.display = 'block';
});

document.getElementById('login-link').addEventListener('click', () => {
    document.getElementById('login-form').style.display = 'block';
    document.getElementById('signup-form').style.display = 'none';
});

document.getElementById('login-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    if (username === '' || password === '') {
        alert('Please fill in all fields');
        return;
    }
    if (users[username] && users[username].password === password) {
        currentUser = users[username];
        showChatContainer();
    } else {
        alert('Invalid username or password');
    }
});

document.getElementById('signup-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const username = document.getElementById('new-username').value;
    const password = document.getElementById('new-password').value;
    if (username === '' || password === '') {
        alert('Please fill in all fields');
        return;
    }
    if (!users[username]) {
        users[username] = { password, role: 1, conversations: [] };
        currentUser = users[username];
        showChatContainer();
    } else {
        alert('Username already taken');
    }
});

document.getElementById('send-btn').addEventListener('click', () => {
    const message = document.getElementById('chat-input').value;
    if (message === '') {
        alert('Please enter a message');
        return;
    }
    const chatLog = document.getElementById('chat-log');
    chatLog.innerHTML += `<div class="user-message">You: ${message}</div>`;
    const args = message.split(' ');
    const commandName = args.shift().toLowerCase();
    if (commands[commandName]) {
        if (commands[commandName].role && currentUser.role >= commands[commandName].role) {
            commands[commandName].execute(chatLog, args);
        } else {
            chatLog.innerHTML += `<div class="bot-message">Bot: You don't have permission to use this command!</div>`;
        }
    } else {
        chatLog.innerHTML += `<div class="bot-message">Bot: ${message} received!</div>`;
    }
    document.getElementById('chat-input').value = '';
    chatLog.scrollTop = chatLog.scrollHeight;
});