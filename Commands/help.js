// commands/help.js
module.exports = {
    name: 'help',
    role: 1,
    execute: (chatLog, args, users, currentUser, commands) => {
        const commandsList = Object.keys(commands).filter(cmd => commands[cmd].role <= users[currentUser].role).join(', ');
        chatLog.innerHTML += `<div class="bot-message">Bot: Available commands: ${commandsList}</div>`;
    }
};