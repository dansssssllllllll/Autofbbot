// commands/setcoin.js
const db = require('../utils/database');

module.exports = {
    name: 'setcoin',
    role: 2,
    execute: (chatLog, args, users, currentUser) => {
        const usersData = db.loadUsers();
        if (args.length !== 2) {
            chatLog.innerHTML += `<div class="bot-message">Bot: Usage: setcoin <username> <amount></div>`;
            return;
        }
        const username = args[0];
        const amount = parseInt(args[1]);
        if (isNaN(amount)) {
            chatLog.innerHTML += `<div class="bot-message">Bot: Invalid amount</div>`;
            return;
        }
        if (!usersData[username]) usersData[username] = { balance: 0 };
        usersData[username].balance = amount;
        db.saveUsers(usersData);
        chatLog.innerHTML += `<div class="bot-message">Bot: ${username}'s balance has been set to ${amount}</div>`;
    }
};