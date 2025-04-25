// commands/bal.js
const db = require('../utils/database');

module.exports = {
    name: 'bal',
    role: 1,
    execute: (chatLog, args, users, currentUser) => {
        const usersData = db.loadUsers();
        const username = Object.keys(usersData).find(key => usersData[key] === currentUser);
        if (!usersData[username]) usersData[username] = { balance: 0 };
        chatLog.innerHTML += `<div class="bot-message">Bot: Your balance is ${usersData[username].balance}</div>`;
    }
};